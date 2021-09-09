from django.db import models

# Create your models here.
class Answer(models.Model):
    usernumber = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    timelapse = models.IntegerField(default=0)
    argumentNumber = models.IntegerField()
    correctness = models.BooleanField(default=False)
    validity = models.BooleanField(default=False)
    game_number = models.IntegerField(default=-1)

    def __str__(self):
        if str(self.validity) == "True":
            valid = "Valid"
        else:
            valid = "Invalid"
        if str(self.correctness) == "True":
            corr = "Correct"
        else:
            corr = "Incorrect"
        return "%d: %s: game_number: %d %s %s" % (self.usernumber, self.date, self.game_number, corr, valid)


