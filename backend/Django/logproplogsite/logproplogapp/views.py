# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib.auth.models import User, Group
from django.http import HttpResponseRedirect, HttpResponseForbidden, HttpResponse

from logproplogapp.models import *


def root_view(request):
    return HttpResponseRedirect('/proplog/') # Just redirect

def getValue(request, key, bValid):
    if not bValid:
        return (None, False)
    else:
        if key in request.GET:
            value = request.GET[key]
            return (value, True)
        else:
            return (None, False)
    

def log(request):
    if request.method == "GET":
        bValid = True
        (usernumber_str, bValid) = getValue(request, u"uid", bValid)
        (timelapse_str, bValid) = getValue(request, u"timelapse", bValid)
        (argumentNumber_str, bValid) = getValue(request, u"argumentNumber", bValid)
        (correctness_str, bValid) = getValue(request, u"corr", bValid)
        (validity_str, bValid) = getValue(request, u"validity", bValid)
        (gameNumber_str, bValid) = getValue(request, u"gameNumber", bValid)

        if not bValid:
            return render(request, 'log.html')
        else:
            if correctness_str == "true":
                bCorrect = True
            else:
                bCorrect = False

            if validity_str == "valid":
                bValid = True
            else:
                bValid = False

            newobj = Answer(usernumber=int(usernumber_str),
                            timelapse=int(timelapse_str),
                            argumentNumber=int(argumentNumber_str),
                            validity=bValid,
                            correctness=bCorrect,
                            game_number=int(gameNumber_str))
            newobj.save()


            return render(request, 'log.html')
    else:
        return render(request, 'log.html')

def dump(request):
    if not request.user.is_authenticated:
        return HttpResponseForbidden()
    else:
        import csv
        from django.http import HttpResponse

        answer_list = list(Answer.objects.all())
        
        result = {} # date --> { usernumber --> { datetime -> argumentNumber --> { "valid"|"invalid" --> { "correct" : correct-count, "wrong" : wrong-count } } } }
        
        for answer in answer_list:
            mydatetime = u"%s" % answer.date
            date = u"%s" % answer.date.date()
            gameNumber = int("%d" % answer.game_number)

            result.setdefault(date, {})


            result[date].setdefault(answer.usernumber, {})

            result[date][answer.usernumber].setdefault(mydatetime, {})
            result[date][answer.usernumber][mydatetime].setdefault(gameNumber, {})
            result[date][answer.usernumber][mydatetime][gameNumber].setdefault(answer.argumentNumber, {})
            result[date][answer.usernumber][mydatetime][gameNumber][answer.argumentNumber].setdefault("valid", {})
            result[date][answer.usernumber][mydatetime][gameNumber][answer.argumentNumber].setdefault("invalid", {})
            
            result[date][answer.usernumber][mydatetime][gameNumber][answer.argumentNumber]["valid"].setdefault("correct", 0)
            result[date][answer.usernumber][mydatetime][gameNumber][answer.argumentNumber]["valid"].setdefault("wrong", 0)

            result[date][answer.usernumber][mydatetime][gameNumber][answer.argumentNumber]["invalid"].setdefault("correct", 0)
            result[date][answer.usernumber][mydatetime][gameNumber][answer.argumentNumber]["invalid"].setdefault("wrong", 0)

            if answer.validity:
                validity = "valid"
            else:
                validity = "invalid"


            if answer.correctness:
                result[date][answer.usernumber][mydatetime][gameNumber][answer.argumentNumber][validity]["correct"] += 1
            else:
                result[date][answer.usernumber][mydatetime][gameNumber][answer.argumentNumber][validity]["wrong"] += 1

        # Create the HttpResponse object with the appropriate CSV header.
        response = HttpResponse("", content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=logproplog-data.csv'

        answerNumber_list = list(range(1,32+1))

        writer = csv.writer(response)
        first_row = []
        first_row.extend(['date', 'usernumber', 'gamenumber'])

        for answerNumber in answerNumber_list:
            first_row.append('A:%d:V:C' % answerNumber)
            first_row.append('A:%d:V:W' % answerNumber)
            first_row.append('A:%d:I:C' % answerNumber)
            first_row.append('A:%d:I:W' % answerNumber)

        first_row.extend(['lastcorrectinarow',
                          'answercount',
                          'correctanswercount'])
        
        writer.writerow(first_row)
    
        for date in sorted(result):
            for usernumber in sorted(result[date]):
                last_correct_in_a_row = 0
                answer_count = 0
                correct_answer_count = 0
                for mydatetime in sorted(result[date][usernumber]):
                    for gameNumber in sorted(result[date][usernumber][mydatetime]):
                        next_row = []
                        next_row.append(mydatetime)
                        next_row.append('%d' % usernumber)
                        next_row.append('%d' % gameNumber)
                        for argumentNumber in answerNumber_list:
                            for validity in ['valid', 'invalid']:
                                if argumentNumber in result[date][usernumber][mydatetime][gameNumber]:
                                    correct = result[date][usernumber][mydatetime][gameNumber][argumentNumber][validity]["correct"]                    
                                    wrong = result[date][usernumber][mydatetime][gameNumber][argumentNumber][validity]["wrong"]                    
                                else:
                                    correct = 0
                                    wrong = 0
                                next_row.append('%d' % correct)
                                next_row.append('%d' % wrong)
                        writer.writerow(next_row)
                        del next_row

                aggregate_row = []
                aggregate_row.append(date)
                aggregate_row.append(usernumber)
                aggregate_row.append('')
                for answerNumber in answerNumber_list:
                    aggregate_row.append('')

                # 'lastcorrectinarow',
                # 'answercount',
                # 'correctanswercount'
                
                new_row.append()
        return response

def dump2(request):
    if not request.user.is_authenticated:
        return HttpResponseForbidden()
    else:
        import csv
        from django.http import HttpResponse

        answer_list = list(Answer.objects.all())
        
        result = {} # date --> { usernumber --> { gamenumber --> { datetime --> { "correct" | "wrong" } } } }
        
        for answer in answer_list:
            mydatetime = u"%s" % answer.date
            date = u"%s" % answer.date.date()
            gameNumber = int("%d" % answer.game_number)

            result.setdefault(date, {})


            result[date].setdefault(answer.usernumber, {})

            result[date][answer.usernumber].setdefault(gameNumber, {})
            result[date][answer.usernumber][gameNumber].setdefault(mydatetime, {})
            if answer.correctness:
                result[date][answer.usernumber][gameNumber][mydatetime] = "correct"
            else:
                result[date][answer.usernumber][gameNumber][mydatetime] = "wrong"

        result2 = {} # date --> { usernumber --> { gamenumber --> { streak-number --> count } } }

        for date in result:
            result2.setdefault(date, {})
            for usernumber in result[date]:
                result2[date].setdefault(usernumber, {})
                for gameNumber in result[date][usernumber]:
                    result2[date][usernumber].setdefault(gameNumber, {})
                    streak_number = 0
                    result2[date][usernumber][gameNumber].setdefault(streak_number, {})
                    result2[date][usernumber][gameNumber][streak_number] = 0
                    
                    for datetime in result[date][usernumber][gameNumber]:
                        bIsCorrect = result[date][usernumber][gameNumber][datetime] == "correct"
                        if bIsCorrect:
                            result2[date][usernumber][gameNumber][streak_number] += 1
                        else:
                            streak_number += 1
                            result2[date][usernumber][gameNumber].setdefault(streak_number, {})
                            result2[date][usernumber][gameNumber][streak_number] = 0
                            
                        

        # Create the HttpResponse object with the appropriate CSV header.
        response = HttpResponse("", content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=logproplog-data-streaks.csv'

        writer = csv.writer(response)
        first_row = ['date', 'usernumber', 'gamenumber', 'streaknumber', 'correct_count']
        writer.writerow(first_row)
    
        for date in sorted(result2):
            for usernumber in sorted(result2[date]):
                for gameNumber in sorted(result2[date][usernumber]):
                    for streakNumber in sorted(result2[date][usernumber][gameNumber]):
                        correctCount = result2[date][usernumber][gameNumber][streakNumber]
                        next_row = []
                        next_row.append(date)
                        next_row.append('%d' % usernumber)
                        next_row.append('%d' % gameNumber)
                        next_row.append('%d' % streakNumber)
                        next_row.append('%d' % correctCount)
                        writer.writerow(next_row)
                        del next_row

        return response


def dump3(request):
    """Dumps a CSV file with one row per answer, sorted by date and user
    number, with an aggregate row for each combination of date and
    user number.
    """
    
    if not request.user.is_authenticated:
        return HttpResponseForbidden()
    else:
        import csv
        from django.http import HttpResponse

        answer_list = list(Answer.objects.all())
        
        result = {} # date --> { usernumber --> { datetime -> [{"argument_number"}, ...] }
        
        for answer in answer_list:
            mydatetime = u"%s" % answer.date
            date = u"%s" % answer.date.date()

            result.setdefault(date, {})


            result[date].setdefault(answer.usernumber, {})

            result[date][answer.usernumber].setdefault(mydatetime, [])

            myanswer_dict = {}

            gameNumber = int("%d" % answer.game_number)
            myanswer_dict["game_number"] = gameNumber
            myanswer_dict["argument_number"] = answer.argumentNumber
            myanswer_dict["date"] = answer.date

            if answer.validity:
                validity = "valid"
            else:
                validity = "invalid"

            myanswer_dict["validity"] = validity

            if answer.correctness:
                correctness = "Correct"
            else:
                correctness = "Incorrect"

            myanswer_dict["correctness"] = correctness

            result[date][answer.usernumber][mydatetime].append(myanswer_dict)

        # Create the HttpResponse object with the appropriate CSV header.
        response = HttpResponse("", content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=logproplog-data-answers-plus-aggregates.csv'

        writer = csv.writer(response)
        first_row = []

        first_row.extend(['date', 'datetime', 'usernumber'])

        first_row.extend(['game_number', 'argument_number',
                          'validity', 'correctness'])

        first_row.extend(['totaltime (s)',
                          'lastcorrectinarow',
                          'answercount',
                          'correctanswercount'])
        
        writer.writerow(first_row)
    
        for date in sorted(result):
            for usernumber in sorted(result[date]):
                last_correct_in_a_row = 0
                answer_count = 0
                correct_answer_count = 0
                min_datetime = None
                max_datetime = None
                for mydatetime in result[date][usernumber]:
                    for myanswer_dict in result[date][usernumber][mydatetime]:
                        if min_datetime == None:
                            min_datetime = myanswer_dict['date']
                        elif min_datetime > myanswer_dict['date']:
                            min_datetime = myanswer_dict['date']
                        else:
                            pass

                        if max_datetime == None:
                            max_datetime = myanswer_dict['date']
                        elif max_datetime < myanswer_dict['date']:
                            max_datetime = myanswer_dict['date']
                        else:
                            pass
                        
                        next_row = []
                        next_row.append(date)
                        next_row.append(mydatetime)
                        next_row.append('%d' % usernumber)
                        
                        next_row.append('%d' % myanswer_dict['game_number'])
                        next_row.append('%d' % myanswer_dict['argument_number'])
                        next_row.append('%s' % myanswer_dict['validity'])
                        next_row.append('%s' % myanswer_dict['correctness'])

                        writer.writerow(next_row)
                        del next_row

                        answer_count += 1

                        if myanswer_dict["correctness"] == "Correct":
                            correct_answer_count += 1
                            last_correct_in_a_row += 1
                        else:
                            last_correct_in_a_row = 0

                timedelta = max_datetime - min_datetime
                aggregate_row = []
                aggregate_row.append(date)
                aggregate_row.append('')
                aggregate_row.append(usernumber)

                # 'game_number', 'argument_number',
                # 'validity', 'correctness'
                aggregate_row.extend(['', '', '', ''])

                # 'totaltime',
                # 'lastcorrectinarow',
                # 'answercount',
                # 'correctanswercount'
                aggregate_row.append('%d' % timedelta.seconds)
                aggregate_row.append('%d' % last_correct_in_a_row)
                aggregate_row.append('%d' % answer_count)
                aggregate_row.append('%d' % correct_answer_count)
                
                writer.writerow(aggregate_row)

                del aggregate_row
                
        return response

    
