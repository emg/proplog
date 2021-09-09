var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var PrologPlusCG;
(function (PrologPlusCG) {
    var cg;
    (function (cg) {
        var CG = /** @class */ (function () {
            function CG(lstConc, lstRel) {
                if (((lstConc != null && (lstConc instanceof Array)) || lstConc === null) && ((lstRel != null && (lstRel instanceof Array)) || lstRel === null)) {
                    var __args = arguments;
                    if (this.m_vctConcepts === undefined) {
                        this.m_vctConcepts = null;
                    }
                    if (this.m_vctRelations === undefined) {
                        this.m_vctRelations = null;
                    }
                    this.m_vctConcepts = lstConc;
                    this.m_vctRelations = lstRel;
                }
                else if (lstConc === undefined && lstRel === undefined) {
                    var __args = arguments;
                    if (this.m_vctConcepts === undefined) {
                        this.m_vctConcepts = null;
                    }
                    if (this.m_vctRelations === undefined) {
                        this.m_vctRelations = null;
                    }
                    this.m_vctConcepts = ([]);
                    this.m_vctRelations = ([]);
                }
                else
                    throw new Error('invalid overload');
            }
            CG.prototype.finalize = function () {
                /* clear */ (this.m_vctConcepts.length = 0);
                /* clear */ (this.m_vctRelations.length = 0);
                this.m_vctConcepts = null;
                this.m_vctRelations = null;
            };
            /**
             * Elle retourne un CG qui est une copie du CG en question
             * @return {PrologPlusCG.cg.CG}
             */
            CG.prototype.myCopy = function () {
                var newCG = new CG();
                var listOfConceptPairs = ([]);
                var conc;
                var ncept;
                for (var listIndex1 = 0; listIndex1 < /* size */ this.m_vctConcepts.length; listIndex1++) {
                    {
                        conc = /* get */ this.m_vctConcepts[listIndex1];
                        ncept = conc.myCopy();
                        newCG.addConcept(ncept);
                        /* addElement */ (listOfConceptPairs.push(new PrologPlusCG.cg.ConceptPair(conc, ncept)) > 0);
                    }
                    ;
                }
                conc = ncept = null;
                var rela;
                var nrela;
                for (var listIndex2 = 0; listIndex2 < /* size */ this.m_vctRelations.length; ++listIndex2) {
                    {
                        rela = this.m_vctRelations[listIndex2];
                        nrela = rela.myCopy();
                        var couple = void 0;
                        var non_trouve1 = true;
                        var non_trouve2 = true;
                        for (var listIndex3 = 0; listIndex3 < /* size */ listOfConceptPairs.length && (non_trouve1 || non_trouve2); ++listIndex3) {
                            {
                                couple = /* get */ listOfConceptPairs[listIndex3];
                                if (non_trouve1 && (rela.m_concSource === couple.m_initialConcept)) {
                                    nrela.m_concSource = couple.m_conceptCopy;
                                    nrela.m_concSource.addOutgoingRelation(nrela);
                                    non_trouve1 = false;
                                }
                                if (non_trouve2 && (rela.m_concDestination === couple.m_initialConcept)) {
                                    nrela.m_concDestination = couple.m_conceptCopy;
                                    nrela.m_concDestination.addIncomingRelation(nrela);
                                    non_trouve2 = false;
                                }
                            }
                            ;
                        }
                        newCG.addRelation(nrela);
                    }
                    ;
                }
                rela = nrela = null;
                /* clear */ (listOfConceptPairs.length = 0);
                listOfConceptPairs = null;
                return newCG;
            };
            /**
             * Ajouter un concept au CG
             * @param {PrologPlusCG.cg.Concept} conc
             */
            CG.prototype.addConcept = function (conc) {
                /* addElement */ (this.m_vctConcepts.push(conc) > 0);
            };
            /**
             * Ajouter une relation au CG
             * @param {PrologPlusCG.cg.Relation} rel
             */
            CG.prototype.addRelation = function (rel) {
                /* addElement */ (this.m_vctRelations.push(rel) > 0);
            };
            /**
             * Enlever un concept du CG
             * @param {PrologPlusCG.cg.Concept} conc
             */
            CG.prototype.removeConcept = function (conc) {
                /* removeElement */ (function (a) { var index = a.indexOf(conc); if (index >= 0) {
                    a.splice(index, 1);
                    return true;
                }
                else {
                    return false;
                } })(this.m_vctConcepts);
            };
            /**
             * Enlever une relation du CG
             * @param {PrologPlusCG.cg.Relation} rel
             */
            CG.prototype.removeRelation = function (rel) {
                /* removeElement */ (function (a) { var index = a.indexOf(rel); if (index >= 0) {
                    a.splice(index, 1);
                    return true;
                }
                else {
                    return false;
                } })(this.m_vctRelations);
            };
            CG.prototype.removeSpecialIdent = function () {
                var conc;
                for (var listIndex1 = 0; listIndex1 < /* size */ this.m_vctConcepts.length; ++listIndex1) {
                    {
                        conc = /* get */ this.m_vctConcepts[listIndex1];
                        if ((conc.m_pdReferent != null) && (conc.m_pdReferent.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentSpecial)) {
                            conc.m_pdReferent = null;
                        }
                    }
                    ;
                }
            };
            CG.prototype.isEmpty = function () {
                return ((this.m_vctConcepts == null) || /* isEmpty */ (this.m_vctConcepts.length == 0));
            };
            /**
             * MakeEmpty les listes de concepts et relations du CG
             */
            CG.prototype.myDestroy = function () {
                /* clear */ (this.m_vctConcepts.length = 0);
                /* clear */ (this.m_vctRelations.length = 0);
                this.m_vctConcepts = null;
                this.m_vctRelations = null;
            };
            CG.prototype.makeEmpty = function () {
                /* clear */ (this.m_vctConcepts.length = 0);
                /* clear */ (this.m_vctRelations.length = 0);
            };
            CG.prototype.createRelation = function (sIdRel, conce_source, conc_destination) {
                var nrel = new PrologPlusCG.cg.Relation(sIdRel, conce_source, conc_destination);
                this.addRelation(nrel);
                nrel = null;
            };
            return CG;
        }());
        cg.CG = CG;
        CG["__class"] = "PrologPlusCG.cg.CG";
    })(cg = PrologPlusCG.cg || (PrologPlusCG.cg = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var cg;
    (function (cg) {
        var CGMatchResult = /** @class */ (function () {
            function CGMatchResult(g, c) {
                if (this.G3 === undefined) {
                    this.G3 = null;
                }
                if (this.E3 === undefined) {
                    this.E3 = null;
                }
                this.G3 = g;
                this.E3 = c;
            }
            CGMatchResult.prototype.finalize = function () {
                this.G3 = null;
                this.E3 = null;
            };
            return CGMatchResult;
        }());
        cg.CGMatchResult = CGMatchResult;
        CGMatchResult["__class"] = "PrologPlusCG.cg.CGMatchResult";
    })(cg = PrologPlusCG.cg || (PrologPlusCG.cg = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var cg;
    (function (cg) {
        var CGOperation = /** @class */ (function () {
            function CGOperation(myenv) {
                this.e_inComeBranch = 0;
                this.e_outComeBranch = 1;
                this.aUnifyCG = null;
                this.corefMatchVec = ([]);
                this.setOpersId = [PrologPlusCG.prolog.DataTypes.e_completeContract, PrologPlusCG.prolog.DataTypes.e_partialContract, PrologPlusCG.prolog.DataTypes.e_subsumeWithoutResult];
                if (this.concMatchVec === undefined) {
                    this.concMatchVec = null;
                }
                if (this.relMatchVec === undefined) {
                    this.relMatchVec = null;
                }
                this.env = null;
                this.env = myenv;
                this.aUnifyCG = new PrologPlusCG.prolog.UnifyCG(this.env);
                this.concMatchVec = ([]);
                this.relMatchVec = ([]);
            }
            /*private*/ CGOperation.prototype.concMatchVec_MakeEmpty = function (lst) {
                var aCMatch;
                for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(lst); e.hasMoreElements();) {
                    {
                        aCMatch = e.nextElement();
                        aCMatch.myDestroy();
                    }
                    ;
                }
                /* clear */ (lst.length = 0);
            };
            /*private*/ CGOperation.prototype.relMatchVec_MakeEmpty = function (lst) {
                var aRMatch;
                for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(lst); e.hasMoreElements();) {
                    {
                        aRMatch = e.nextElement();
                        aRMatch.myDestroy();
                    }
                    ;
                }
                /* clear */ (lst.length = 0);
            };
            CGOperation.prototype.corefMatchVec_MakeEmpty = function () {
                var aCorefMatch;
                for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(this.corefMatchVec); e.hasMoreElements();) {
                    {
                        aCorefMatch = e.nextElement();
                        aCorefMatch.myDestroy();
                    }
                    ;
                }
                /* clear */ (this.corefMatchVec.length = 0);
            };
            CGOperation.prototype.sameNameRel = function (rla1, niv1, rla2, niv2) {
                var valIndLeft = this.env.unification.valueFromUnifStack(rla1, niv1);
                var valIndRight = this.env.unification.valueFromUnifStack(rla2, niv2);
                if ((valIndLeft.pData == null) || (valIndRight.pData == null)) {
                    throw new PrologPlusCG.prolog.ExecException("Error: for CG operations, relations should have specific values\nand not be free variables.");
                }
                var pData1Left;
                var pData1Right;
                pData1Left = valIndLeft.pData.data;
                pData1Right = valIndRight.pData.data;
                var sDon1 = pData1Left;
                var sDon2 = pData1Right;
                return (sDon1 === sDon2);
            };
            CGOperation.convertToByte = function (IdOperGC, G3) {
                var result = 0;
                if (IdOperGC === ("maximalJoin")) {
                    result = PrologPlusCG.prolog.DataTypes.e_maximalJoin;
                }
                else if (IdOperGC === ("generalize")) {
                    result = PrologPlusCG.prolog.DataTypes.e_generalize;
                }
                else if ((IdOperGC === ("subsume")) && (G3 == null)) {
                    result = PrologPlusCG.prolog.DataTypes.e_subsumeWithoutResult;
                }
                else if ((IdOperGC === ("subsume")) && (G3 != null)) {
                    result = PrologPlusCG.prolog.DataTypes.e_subsume;
                }
                return result;
            };
            CGOperation.prototype.matchCG = function (OperCG, E1, G1, level1, E2, G2, level2, resMatchCG) {
                var bResult = false;
                if (((OperCG === PrologPlusCG.prolog.DataTypes.e_project) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsumeWithoutResult) || (OperCG === PrologPlusCG.prolog.DataTypes.e_completeContract)) && (( /* size */G1.m_vctRelations.length > /* size */ G2.m_vctRelations.length) || !this.bagInclusion(G1.m_vctRelations, level1, G2.m_vctRelations, level2))) {
                    bResult = false;
                }
                else {
                    bResult = this.computeEntryPointsAndMatch(OperCG, E1, G1, level1, E2, G2, level2, resMatchCG);
                }
                return bResult;
            };
            CGOperation.prototype.bagInclusion = function (lr1, niv1, lr2, niv2) {
                var lst = ([]);
                var rla1 = null;
                var rla2 = null;
                var bFound;
                for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(lr1); e.hasMoreElements();) {
                    {
                        rla1 = e.nextElement();
                        bFound = false;
                        for (var e1 = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(lr2); e1.hasMoreElements() && !bFound;) {
                            {
                                rla2 = e1.nextElement();
                                if (this.sameNameRel(rla1.m_pdRelationName, niv1, rla2.m_pdRelationName, niv2) && !(lst.indexOf((rla2)) >= 0)) {
                                    bFound = true;
                                }
                            }
                            ;
                        }
                        if (bFound) {
                            /* addElement */ (lst.push(rla2) > 0);
                        }
                        else {
                            /* clear */ (lst.length = 0);
                            lst = null;
                            return false;
                        }
                    }
                    ;
                }
                /* clear */ (lst.length = 0);
                lst = null;
                return true;
            };
            CGOperation.prototype.computeEntryPointsAndMatch = function (OperCG, E1, G1, level1, E2, G2, level2, resMatchCG) {
                var C1;
                var C2;
                var bResult = false;
                if ((E1 != null) && (E2 != null)) {
                    if (!(G1.m_vctConcepts.indexOf((E1)) >= 0)) {
                        throw new PrologPlusCG.prolog.ExecException("Error: the first entry concept is not in the corresponding CG.");
                    }
                    if (!(G2.m_vctConcepts.indexOf((E2)) >= 0)) {
                        throw new PrologPlusCG.prolog.ExecException("Error: the second entry concept is not in the corresponding CG.");
                    }
                    bResult = this.matchWithBack(OperCG, E1, E2, null, null, G1, level1, G2, level2, resMatchCG.G3);
                    if (bResult) {
                        var eMatchL = this.inCMatchL(E1, E2);
                        resMatchCG.E3 = eMatchL.m_ResultOfMatch;
                    }
                }
                else if (( /* size */G1.m_vctConcepts.length === 1) && /* isEmpty */ (G1.m_vctRelations.length == 0)) {
                    C1 = G1.m_vctConcepts[0];
                    for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(G2.m_vctConcepts); e.hasMoreElements() && !bResult;) {
                        {
                            C2 = e.nextElement();
                            bResult = this.matchConcept(OperCG, C1, level1, C2, level2, resMatchCG.G3);
                        }
                        ;
                    }
                    bResult = bResult && this.postMatch(OperCG, G1, level1, G2, level2, resMatchCG.G3);
                }
                else if (( /* size */G2.m_vctConcepts.length === 1) && /* isEmpty */ (G2.m_vctRelations.length == 0)) {
                    C2 = G2.m_vctConcepts[0];
                    for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(G1.m_vctConcepts); e.hasMoreElements() && !bResult;) {
                        {
                            C1 = e.nextElement();
                            bResult = this.matchConcept(OperCG, C1, level1, C2, level2, resMatchCG.G3);
                        }
                        ;
                    }
                    bResult = bResult && this.postMatch(OperCG, G1, level1, G2, level2, resMatchCG.G3);
                }
                else {
                    var vConcs = ([]);
                    if ((OperCG !== PrologPlusCG.prolog.DataTypes.e_generalize) && (this.aUnifyCG.identRef(G1, level1, G2, level2, vConcs) || this.varCoref(G1, G2, vConcs))) {
                        C1 = vConcs[0];
                        C2 = vConcs[1];
                        bResult = this.matchWithBack(OperCG, C1, C2, null, null, G1, level1, G2, level2, resMatchCG.G3);
                        /* clear */ (vConcs.length = 0);
                        vConcs = null;
                    }
                    else if ((OperCG === PrologPlusCG.prolog.DataTypes.e_project) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsumeWithoutResult) || (OperCG === PrologPlusCG.prolog.DataTypes.e_completeContract)) {
                        /* clear */ (vConcs.length = 0);
                        var rl1 = void 0;
                        var rl2 = void 0;
                        for (var e1 = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(G1.m_vctRelations); e1.hasMoreElements() && !bResult;) {
                            {
                                rl1 = e1.nextElement();
                                for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(G2.m_vctRelations); e.hasMoreElements() && !bResult;) {
                                    {
                                        rl2 = e.nextElement();
                                        if (this.sameNameRel(rl1.m_pdRelationName, level1, rl2.m_pdRelationName, level2)) {
                                            bResult = this.matchWithBack(OperCG, rl1.m_concSource, rl2.m_concSource, rl1.m_concDestination, rl2.m_concDestination, G1, level1, G2, level2, resMatchCG.G3);
                                        }
                                    }
                                    ;
                                }
                            }
                            ;
                        }
                    }
                    else {
                        /* clear */ (vConcs.length = 0);
                        var rl1 = void 0;
                        var bRelationFound = false;
                        for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(G1.m_vctRelations); e.hasMoreElements() && !bResult;) {
                            {
                                rl1 = e.nextElement();
                                var rl2 = void 0;
                                for (var e1 = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(G2.m_vctRelations); e1.hasMoreElements() && !bResult;) {
                                    {
                                        rl2 = e1.nextElement();
                                        if (this.sameNameRel(rl1.m_pdRelationName, level1, rl2.m_pdRelationName, level2)) {
                                            bResult = this.matchWithBack(OperCG, rl1.m_concSource, rl2.m_concSource, rl1.m_concDestination, rl2.m_concDestination, G1, level1, G2, level2, resMatchCG.G3);
                                            bRelationFound = true;
                                        }
                                    }
                                    ;
                                }
                            }
                            ;
                        }
                        if (!bRelationFound) {
                            var conc1 = void 0;
                            for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(G1.m_vctConcepts); e.hasMoreElements() && !bResult;) {
                                {
                                    conc1 = e.nextElement();
                                    var conc2 = void 0;
                                    for (var e1 = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(G2.m_vctConcepts); e1.hasMoreElements() && !bResult;) {
                                        {
                                            conc2 = e1.nextElement();
                                            bResult = this.matchConcept(OperCG, conc1, level1, conc2, level2, resMatchCG.G3);
                                        }
                                        ;
                                    }
                                }
                                ;
                            }
                            bResult = bResult && this.postMatch(OperCG, G1, level1, G2, level2, resMatchCG.G3);
                        }
                    }
                }
                if ((OperCG !== PrologPlusCG.prolog.DataTypes.e_partialContract) && (OperCG !== PrologPlusCG.prolog.DataTypes.e_completeContract)) {
                    this.concMatchVec_MakeEmpty(this.concMatchVec);
                    this.relMatchVec_MakeEmpty(this.relMatchVec);
                }
                return bResult;
            };
            CGOperation.prototype.varCoref = function (G1, G2, vConcs) {
                var bResult = false;
                var C1 = null;
                var C2 = null;
                for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(G1.m_vctConcepts); e.hasMoreElements() && !bResult;) {
                    {
                        C1 = e.nextElement();
                        var sRef1 = null;
                        if ((C1.m_pdReferent != null) && (typeof C1.m_pdReferent.data === 'string')) {
                            sRef1 = C1.m_pdReferent.data;
                        }
                        if ((sRef1 != null) && this.isCoreferent(C1.m_pdReferent)) {
                            var CM = void 0;
                            var trouve = false;
                            for (var e1 = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(this.corefMatchVec); e1.hasMoreElements() && !bResult && !trouve;) {
                                {
                                    CM = e1.nextElement();
                                    if ((CM.Var1 != null) && (CM.Var1 === sRef1)) {
                                        trouve = true;
                                        for (var e2 = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(G2.m_vctConcepts); e2.hasMoreElements() && !bResult;) {
                                            {
                                                C2 = e2.nextElement();
                                                bResult = ((C2.m_pdReferent != null) && (CM.Var2 != null) && (typeof C2.m_pdReferent.data === 'string') && /* equals */ (function (o1, o2) { return o1 && o1.equals ? o1.equals(o2) : o1 === o2; })(CM.Var2, C2.m_pdReferent.data));
                                            }
                                            ;
                                        }
                                    }
                                }
                                ;
                            }
                        }
                    }
                    ;
                }
                if (bResult) {
                    /* addElement */ (vConcs.push(C1) > 0);
                    /* addElement */ (vConcs.push(C2) > 0);
                }
                return bResult;
            };
            CGOperation.prototype.isCoreferent = function (Ref) {
                if ((Ref != null) && (Ref.typeOfData === PrologPlusCG.prolog.DataTypes.uVariable)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            CGOperation.prototype.matchWithBack = function (OperCG, Cs1, Cs2, Ct1, Ct2, G1, level1, G2, level2, G3) {
                var bResult = false;
                var AncCorefL = ([]);
                var elm;
                var Nelm;
                for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(this.corefMatchVec); e.hasMoreElements();) {
                    {
                        elm = e.nextElement();
                        var s1 = null;
                        if (elm.Var1 != null) {
                            s1 = elm.Var1;
                        }
                        var s2 = null;
                        if (elm.Var2 != null) {
                            s2 = elm.Var2;
                        }
                        var s3 = null;
                        if (elm.Var3 != null) {
                            s3 = elm.Var3;
                        }
                        Nelm = new PrologPlusCG.cg.CoreferenceMatch(s1, s2, s3);
                        /* addElement */ (AncCorefL.push(Nelm) > 0);
                    }
                    ;
                }
                if (this.matchConcept(OperCG, Cs1, level1, Cs2, level2, G3) && ((Ct1 == null) || this.matchConcept(OperCG, Ct1, level1, Ct2, level2, G3)) && this.propagateMatchCG(OperCG, G1, level1, G2, level2, G3)) {
                    bResult = true;
                }
                else {
                    this.corefMatchVec_MakeEmpty();
                    var CorefMTmp = void 0;
                    for (var ex = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(AncCorefL); ex.hasMoreElements();) {
                        {
                            CorefMTmp = ex.nextElement();
                            /* addElement */ (this.corefMatchVec.push(CorefMTmp) > 0);
                        }
                        ;
                    }
                    /* clear */ (AncCorefL.length = 0);
                    this.concMatchVec_MakeEmpty(this.concMatchVec);
                    this.relMatchVec_MakeEmpty(this.relMatchVec);
                    if (G3 != null) {
                        G3.makeEmpty();
                    }
                    bResult = false;
                }
                var aCorefMatch;
                for (var ex = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(AncCorefL); ex.hasMoreElements();) {
                    {
                        aCorefMatch = ex.nextElement();
                        aCorefMatch.myDestroy();
                    }
                    ;
                }
                /* clear */ (AncCorefL.length = 0);
                return bResult;
            };
            CGOperation.prototype.propagateMatchCG = function (OperCG, G1, niv1, G2, niv2, G3) {
                var bResult = true;
                var suite = true;
                while ((bResult && suite)) {
                    {
                        var E = null;
                        suite = false;
                        for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(this.concMatchVec); e.hasMoreElements() && !suite;) {
                            {
                                E = e.nextElement();
                                suite = (E.m_IsConcMatched && !E.m_IsMatchedLocally);
                            }
                            ;
                        }
                        if (!suite) {
                            for (var e1 = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(this.concMatchVec); e1.hasMoreElements() && !suite;) {
                                {
                                    E = e1.nextElement();
                                    suite = !E.m_IsConcMatched;
                                }
                                ;
                            }
                        }
                        if (suite) {
                            if (!E.m_IsConcMatched) {
                                bResult = this.matchConceptS(OperCG, E.m_ConcMatched1, niv1, E.m_ConcMatched2, niv2);
                            }
                            if (bResult) {
                                bResult = this.matchBranches(this.e_outComeBranch, OperCG, E.m_ConcMatched1, niv1, E.m_ConcMatched2, niv2, E.m_ResultOfMatch, G3) && this.matchBranches(this.e_inComeBranch, OperCG, E.m_ConcMatched1, niv1, E.m_ConcMatched2, niv2, E.m_ResultOfMatch, G3);
                                if (bResult) {
                                    E.m_IsMatchedLocally = true;
                                }
                            }
                        }
                    }
                }
                ;
                return (bResult && this.postMatch(OperCG, G1, niv1, G2, niv2, G3));
            };
            CGOperation.prototype.matchBranches = function (BranchDirection, OperCG, C1, level1, C2, level2, C3, G3) {
                var bResult = true;
                var rel1;
                var bAlreadyMatched;
                var vctRels1 = null;
                if (BranchDirection === this.e_inComeBranch) {
                    vctRels1 = C1.m_vctIncomingRelations;
                }
                else {
                    vctRels1 = C1.m_vctOutgoingRelations;
                }
                for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(vctRels1); e.hasMoreElements() && bResult;) {
                    {
                        rel1 = e.nextElement();
                        bAlreadyMatched = false;
                        var E = null;
                        for (var e1 = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(this.relMatchVec); e1.hasMoreElements() && !bAlreadyMatched;) {
                            {
                                E = e1.nextElement();
                                bAlreadyMatched = (rel1 === E.m_RelMatched1);
                            }
                            ;
                        }
                        if (!bAlreadyMatched) {
                            bResult = this.matchTheBranch(BranchDirection, OperCG, rel1, C2, C3, G3, level1, level2);
                        }
                        else {
                            bResult = this.unificationIsValid(BranchDirection, C2, E.m_RelMatched1, E.m_RelMatched2);
                        }
                    }
                    ;
                }
                return bResult;
            };
            CGOperation.prototype.unificationIsValid = function (BranchDirection, C2, rel1, rel2) {
                var Ca1;
                var Ca2;
                var bResult = false;
                if (BranchDirection === this.e_inComeBranch) {
                    Ca1 = rel1.m_concSource;
                    Ca2 = rel2.m_concSource;
                    bResult = (C2 === rel2.m_concDestination);
                }
                else {
                    Ca1 = rel1.m_concDestination;
                    Ca2 = rel2.m_concDestination;
                    bResult = (C2 === rel2.m_concSource);
                }
                if (bResult) {
                    var E = this.inCMatchL(Ca1, Ca2);
                    if (E == null) {
                        bResult = false;
                    }
                }
                return bResult;
            };
            /**
             * Verify that the pair (Ca1, Ca2) exists in concMatchVec
             * @param {PrologPlusCG.cg.Concept} Ca1
             * @param {PrologPlusCG.cg.Concept} Ca2
             * @return {PrologPlusCG.cg.ConceptMatch}
             */
            CGOperation.prototype.inCMatchL = function (Ca1, Ca2) {
                var bResult = false;
                var E = null;
                for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(this.concMatchVec); e.hasMoreElements() && !bResult;) {
                    {
                        E = e.nextElement();
                        if ((E.m_ConcMatched1 === Ca1) && (E.m_ConcMatched2 === Ca2)) {
                            bResult = true;
                        }
                    }
                    ;
                }
                if (bResult) {
                    return E;
                }
                else {
                    return null;
                }
            };
            CGOperation.prototype.matchTheBranch = function (BranchDirection, OperCG, rel1, C2, C3, G3, niv1, niv2) {
                var bResult = false;
                var rel2 = null;
                var vRels;
                if (BranchDirection === this.e_inComeBranch) {
                    vRels = C2.m_vctIncomingRelations;
                }
                else {
                    vRels = C2.m_vctOutgoingRelations;
                }
                for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(vRels); !bResult && e.hasMoreElements();) {
                    {
                        rel2 = e.nextElement();
                        if (this.sameNameRel(rel1.m_pdRelationName, niv1, rel2.m_pdRelationName, niv2)) {
                            bResult = true;
                        }
                        if (bResult) {
                            var bAlreadyMatched = false;
                            var Er = void 0;
                            for (var e1 = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(this.relMatchVec); e1.hasMoreElements() && !bAlreadyMatched;) {
                                {
                                    Er = e1.nextElement();
                                    bAlreadyMatched = (rel2 === Er.m_RelMatched2);
                                }
                                ;
                            }
                            if (bAlreadyMatched) {
                                bResult = false;
                            }
                        }
                        if (bResult) {
                            var Ca1 = void 0;
                            var Ca2 = void 0;
                            var Ca3 = void 0;
                            Ca1 = Ca2 = Ca3 = null;
                            if (BranchDirection === this.e_inComeBranch) {
                                Ca1 = rel1.m_concSource;
                                Ca2 = rel2.m_concSource;
                            }
                            else {
                                Ca1 = rel1.m_concDestination;
                                Ca2 = rel2.m_concDestination;
                            }
                            var E = this.inCMatchL(Ca1, Ca2);
                            if (E != null) {
                                bResult = ((E.m_ConcMatched1 === Ca1) && (E.m_ConcMatched2 === Ca2));
                            }
                            else {
                                bResult = this.matchConcept(OperCG, Ca1, niv1, Ca2, niv2, G3);
                            }
                            if (bResult) {
                                /* addElement */ (this.relMatchVec.push(new PrologPlusCG.cg.RelationMatch(rel1, rel2)) > 0);
                                if (!this["in"](OperCG, this.setOpersId, 2)) {
                                    var El = void 0;
                                    for (var e4 = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(this.concMatchVec); e4.hasMoreElements() && (Ca3 == null);) {
                                        {
                                            El = e4.nextElement();
                                            if ((Ca1 === El.m_ConcMatched1) && (Ca2 === El.m_ConcMatched2)) {
                                                Ca3 = El.m_ResultOfMatch;
                                            }
                                        }
                                        ;
                                    }
                                    var Rp = new PrologPlusCG.cg.Relation();
                                    var ValRel1 = this.env.unification.valueFromUnifStack(rel1.m_pdRelationName, niv1);
                                    Rp.m_pdRelationName = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, ValRel1.pData.data);
                                    ValRel1 = null;
                                    if (BranchDirection === this.e_inComeBranch) {
                                        Rp.m_concSource = Ca3;
                                        Rp.m_concDestination = C3;
                                        /* addElement */ (Ca3.m_vctOutgoingRelations.push(Rp) > 0);
                                        /* addElement */ (C3.m_vctIncomingRelations.push(Rp) > 0);
                                    }
                                    else {
                                        Rp.m_concSource = C3;
                                        Rp.m_concDestination = Ca3;
                                        /* addElement */ (C3.m_vctOutgoingRelations.push(Rp) > 0);
                                        /* addElement */ (Ca3.m_vctIncomingRelations.push(Rp) > 0);
                                    }
                                    /* addElement */ (G3.m_vctRelations.push(Rp) > 0);
                                }
                            }
                        }
                    }
                    ;
                }
                if (!bResult) {
                    if ((OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin)) {
                        bResult = true;
                    }
                }
                return bResult;
            };
            CGOperation.prototype.postMatch = function (OperCG, G1, niv1, G2, niv2, G3) {
                var bResult = true;
                switch ((OperCG)) {
                    case 31 /* e_maximalJoin */:
                        this.addBranches(PrologPlusCG.prolog.DataTypes.e_maximalJoin, G1, niv1, G2, niv2, G3);
                        break;
                    case 30 /* e_project */:
                    case 33 /* e_subsume */:
                    case 34 /* e_subsumeWithoutResult */:
                    case 35 /* e_completeContract */:
                        {
                            var R = void 0;
                            for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(G1.m_vctRelations); e.hasMoreElements() && bResult;) {
                                {
                                    R = e.nextElement();
                                    bResult = false;
                                    var er = void 0;
                                    for (var e1 = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(this.relMatchVec); e1.hasMoreElements() && !bResult;) {
                                        {
                                            er = e1.nextElement();
                                            bResult = (R === er.m_RelMatched1);
                                        }
                                        ;
                                    }
                                }
                                ;
                            }
                        }
                        ;
                        break;
                }
                return bResult;
            };
            CGOperation.prototype.addBranches = function (m, G1, niv1, G2, niv2, G3) {
                if (m === PrologPlusCG.prolog.DataTypes.e_maximalJoin) {
                    this.addBranchsOfCG(G1, niv1, 1, G3);
                    this.addBranchsOfCG(G2, niv2, 2, G3);
                }
            };
            CGOperation.prototype.addBranchsOfCG = function (G, niv, N, Gt) {
                var C;
                for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(G.m_vctConcepts); e.hasMoreElements();) {
                    {
                        C = e.nextElement();
                        var Cc = void 0;
                        var Cck = void 0;
                        Cc = this.matchedConc(C, niv, N, Gt);
                        var R = void 0;
                        for (var e1 = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(C.m_vctIncomingRelations); e1.hasMoreElements();) {
                            {
                                R = e1.nextElement();
                                if (!this.matchedRel(R, N)) {
                                    var Ck = R.m_concSource;
                                    Cck = this.matchedConc(Ck, niv, N, Gt);
                                    this.addRel(N, Cck, R, niv, Cc, Gt);
                                }
                            }
                            ;
                        }
                        for (var e2 = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(C.m_vctOutgoingRelations); e2.hasMoreElements();) {
                            {
                                R = e2.nextElement();
                                if (!this.matchedRel(R, N)) {
                                    var Ck = R.m_concDestination;
                                    Cck = this.matchedConc(Ck, niv, N, Gt);
                                    this.addRel(N, Cc, R, niv, Cck, Gt);
                                }
                            }
                            ;
                        }
                    }
                    ;
                }
            };
            CGOperation.prototype.matchedRel = function (R, N) {
                var r;
                for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(this.relMatchVec); e.hasMoreElements();) {
                    {
                        r = e.nextElement();
                        if (((N === 1) && (r.m_RelMatched1 === R)) || ((N === 2) && (r.m_RelMatched2 === R))) {
                            return true;
                        }
                    }
                    ;
                }
                return false;
            };
            CGOperation.prototype.matchedConc = function (C, niv, N, Gt) {
                var ec;
                for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(this.concMatchVec); e.hasMoreElements();) {
                    {
                        ec = e.nextElement();
                        if ((N === 1) && (ec.m_ConcMatched1 === C)) {
                            return ec.m_ResultOfMatch;
                        }
                        else if ((N === 2) && (ec.m_ConcMatched2 === C)) {
                            return ec.m_ResultOfMatch;
                        }
                    }
                    ;
                }
                return this.addConc(N, C, niv, Gt);
            };
            CGOperation.prototype.addConc = function (N, C, niv, Gt) {
                var Cp = null;
                if (C.m_pdType == null) {
                    var ValRef = this.env.unification.valueFromUnifStack(C.m_pdReferent, niv);
                    if (ValRef.pData == null) {
                        throw new PrologPlusCG.prolog.ExecException("Error: The concept to be added should be a specific concept, not a free variable.");
                    }
                    else {
                        var cTmp = ValRef.pData.data;
                        Cp = cTmp.copyValue(niv);
                    }
                }
                else {
                    Cp = C.copyValue(niv);
                }
                /* addElement */ (Gt.m_vctConcepts.push(Cp) > 0);
                var M = null;
                if (N === 1) {
                    M = new PrologPlusCG.cg.ConceptMatch(C, Cp, Cp, true, false);
                }
                else {
                    M = new PrologPlusCG.cg.ConceptMatch(Cp, C, Cp, true, false);
                }
                /* addElement */ (this.concMatchVec.push(M) > 0);
                return Cp;
            };
            CGOperation.prototype.addRel = function (N, CP, R, niv, CF, Gt) {
                var Rp = new PrologPlusCG.cg.Relation();
                var ValRel = this.env.unification.valueFromUnifStack(R.m_pdRelationName, niv);
                var sRel = ValRel.pData.data;
                Rp.m_pdRelationName = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, sRel);
                Rp.m_concSource = CP;
                Rp.m_concDestination = CF;
                /* addElement */ (CP.m_vctOutgoingRelations.push(Rp) > 0);
                /* addElement */ (CF.m_vctIncomingRelations.push(Rp) > 0);
                /* addElement */ (Gt.m_vctRelations.push(Rp) > 0);
                var M = null;
                if (N === 1) {
                    M = new PrologPlusCG.cg.RelationMatch(R, null);
                }
                else {
                    M = new PrologPlusCG.cg.RelationMatch(null, R);
                }
                /* addElement */ (this.relMatchVec.push(M) > 0);
            };
            CGOperation.prototype.matchConcept = function (OperCG, C1, niv1, C2, niv2, G3) {
                var bResult = true;
                var C3 = null;
                if ((C1.m_pdValue != null) && (C1.m_pdValue.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) && (C2.m_pdValue != null) && (C2.m_pdValue.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)) {
                    if (!this["in"](OperCG, this.setOpersId, 2)) {
                        C3 = new PrologPlusCG.cg.Concept(this.env);
                    }
                    if (this.matchType(OperCG, C1.m_pdType, niv1, C2.m_pdType, niv2, C3)) {
                        var M = new PrologPlusCG.cg.ConceptMatch(C1, C2, C3, false, false);
                        /* addElement */ (this.concMatchVec.push(M) > 0);
                        if (C3 != null) {
                            /* addElement */ (G3.m_vctConcepts.push(C3) > 0);
                        }
                    }
                    else {
                        bResult = false;
                    }
                }
                else {
                    var resMatch = this.matchConc(OperCG, C1, niv1, C2, niv2);
                    if (resMatch.bRes) {
                        C3 = resMatch.C3;
                        var M = new PrologPlusCG.cg.ConceptMatch(C1, C2, C3, true, false);
                        /* addElement */ (this.concMatchVec.push(M) > 0);
                        if (C3 != null) {
                            /* addElement */ (G3.m_vctConcepts.push(C3) > 0);
                        }
                    }
                    else {
                        bResult = false;
                    }
                    resMatch = null;
                }
                C3 = null;
                return bResult;
            };
            CGOperation.prototype.matchConceptS = function (OperCG, C1, level1, C2, level2) {
                var bResult = true;
                var resMatch = this.matchConc(OperCG, C1, level1, C2, level2);
                var C3 = resMatch.C3;
                if (resMatch.bRes) {
                    var E = null;
                    var ec = void 0;
                    for (var e1 = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(this.concMatchVec); e1.hasMoreElements() && (E == null);) {
                        {
                            ec = e1.nextElement();
                            if ((ec.m_ConcMatched1 === C1) && (ec.m_ConcMatched2 === C2)) {
                                E = ec;
                            }
                        }
                        ;
                    }
                    E.m_IsConcMatched = true;
                    if (C3 != null) {
                        this.copyDataCept(C3, E.m_ResultOfMatch);
                    }
                }
                else {
                    bResult = false;
                }
                return bResult;
            };
            CGOperation.prototype.copyDataCept = function (C1, C2) {
                C2.m_pdType = C1.m_pdType.myCopy();
                if (C1.m_pdReferent != null) {
                    C2.m_pdReferent = C1.m_pdReferent.myCopy();
                }
                if (C1.m_pdValue != null) {
                    C2.m_pdValue = C1.m_pdValue.myCopy();
                }
            };
            CGOperation.prototype.matchConc = function (OperCG, C1, niv1, C2, niv2) {
                var C3 = null;
                var bResult = true;
                if (!this["in"](OperCG, this.setOpersId, 2)) {
                    C3 = new PrologPlusCG.cg.Concept(this.env);
                }
                switch ((OperCG)) {
                    case 31 /* e_maximalJoin */:
                    case 32 /* e_generalize */:
                    case 33 /* e_subsume */:
                    case 34 /* e_subsumeWithoutResult */:
                    case 36 /* e_partialContract */:
                    case 35 /* e_completeContract */:
                        bResult = this.matchType(OperCG, C1.m_pdType, niv1, C2.m_pdType, niv2, C3) && this.matchRef(OperCG, C1.m_pdReferent, niv1, C2.m_pdReferent, niv2, C3) && this.matchValue(OperCG, C1.m_pdValue, niv1, C2.m_pdValue, niv2, C3);
                        break;
                    case 29 /* e_match */:
                    case 30 /* e_project */:
                        {
                            C3 = new PrologPlusCG.cg.Concept(this.env);
                            var Typ1 = C1.m_pdType.data;
                            var Typ2 = C2.m_pdType.data;
                            C3.m_pdType = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, "match(" + Typ1 + "," + Typ2 + ")");
                            C3.m_pdReferent = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, "matchedReferent");
                        }
                        ;
                        break;
                }
                return new PrologPlusCG.cg.ConceptMatchResult(bResult, C3);
            };
            CGOperation.prototype.matchType = function (OperCG, Type1, level1, Type2, level2, C3) {
                var Type3 = null;
                var bResult = false;
                var valIndLeft = this.env.unification.valueFromUnifStack(Type1, level1);
                var valIndRight = this.env.unification.valueFromUnifStack(Type2, level2);
                if ((valIndLeft.pData == null) || (valIndRight.pData == null)) {
                    throw new PrologPlusCG.prolog.ExecException("Error: for CG operations, types shoud have specific values.");
                }
                else {
                    var pData1Left = void 0;
                    var pData1Right = void 0;
                    pData1Left = valIndLeft.pData.data;
                    pData1Right = valIndRight.pData.data;
                    var sData1 = pData1Left;
                    var sData2 = pData1Right;
                    if (this.env.typeHierarchy == null) {
                        throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified (a CG operation needs it).");
                    }
                    switch ((OperCG)) {
                        case 31 /* e_maximalJoin */:
                            {
                                if (sData1 === sData2) {
                                    Type3 = sData1;
                                }
                                else {
                                    Type3 = this.env.typeHierarchy.maxComSubType(sData1, sData2);
                                }
                                bResult = (!(Type3 === ("Absurd")));
                            }
                            ;
                            break;
                        case 33 /* e_subsume */:
                            {
                                bResult = this.env.typeHierarchy.isSubType(sData2, sData1);
                                Type3 = sData2;
                            }
                            ;
                            break;
                        case 34 /* e_subsumeWithoutResult */:
                        case 36 /* e_partialContract */:
                        case 35 /* e_completeContract */:
                            bResult = this.env.typeHierarchy.isSubType(sData2, sData1);
                            break;
                        case 32 /* e_generalize */:
                            {
                                if (sData1 === sData2) {
                                    Type3 = sData1;
                                }
                                else {
                                    Type3 = this.env.typeHierarchy.minComSuperType(sData1, sData2);
                                }
                                bResult = (!(Type3 === ("Universal")) && !(Type3 === ("UNIVERSAL")));
                            }
                            ;
                            break;
                        default:
                            throw new PrologPlusCG.prolog.ExecException("Error : CG Operation not predefined.");
                    }
                    if (bResult && (Type3 != null)) {
                        C3.m_pdType = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, Type3);
                    }
                }
                return bResult;
            };
            CGOperation.prototype.matchRef = function (OperCG, Ref1, niv1, Ref2, niv2, C3) {
                var bResult = this.LocaliseOrAdd(OperCG, Ref1, Ref2, C3);
                if (!bResult) {
                    return bResult;
                }
                var valIndLeft;
                if (Ref1 != null) {
                    valIndLeft = this.env.unification.valueFromUnifStack(Ref1, niv1);
                }
                else {
                    valIndLeft = null;
                }
                var valIndRight;
                if (Ref2 != null) {
                    valIndRight = this.env.unification.valueFromUnifStack(Ref2, niv2);
                }
                else {
                    valIndRight = null;
                }
                if (((Ref1 == null) || (valIndLeft.pData == null) || ((typeof Ref1.data === 'string') && (Ref1.data === ("super")))) && ((Ref2 == null) || (valIndRight.pData == null) || ((typeof Ref2.data === 'string') && (Ref2.data === ("super"))))) {
                    bResult = true;
                }
                else {
                    if ((valIndLeft != null) && (valIndLeft.pData != null) && (valIndRight != null) && (valIndRight.pData != null)) {
                        if (((valIndLeft.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uIdentifier) && (valIndLeft.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uString) && (valIndLeft.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uSet)) || ((valIndRight.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uIdentifier) && (valIndRight.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uString) && (valIndRight.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uSet))) {
                            throw new PrologPlusCG.prolog.ExecException("Error: the referent " + Ref1.data.toString() + " or " + Ref2.data.toString() + " is not an identifier or a string or a set.");
                        }
                        else if ((typeof valIndLeft.pData.data === 'string') && (typeof valIndRight.pData.data === 'string')) {
                            var sval1 = valIndLeft.pData.data;
                            var sval2 = valIndRight.pData.data;
                            if (sval1 === sval2) {
                                if ((OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize)) {
                                    C3.m_pdReferent = valIndLeft.pData.myCopy();
                                }
                            }
                            else if (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize) {
                                C3.m_pdReferent = null;
                            }
                            else {
                                bResult = false;
                            }
                        }
                        else if ((valIndLeft.pData.data != null && valIndLeft.pData.data instanceof PrologPlusCG.prolog.PrologList) && (valIndRight.pData.data != null && valIndRight.pData.data instanceof PrologPlusCG.prolog.PrologList)) {
                            var setVal1 = valIndLeft.pData.data;
                            var setVal2 = valIndRight.pData.data;
                            var setVal3 = null;
                            if (OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin) {
                                setVal3 = this.env.compile.union(setVal1, setVal2);
                                C3.m_pdReferent = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uSet, setVal3);
                                bResult = this.aUnifyCG.conform(C3.m_pdReferent, valIndLeft.index, C3.m_pdType.data);
                            }
                            else if (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize) {
                                setVal3 = this.env.compile.intersection(setVal1, setVal2);
                                C3.m_pdReferent = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uSet, setVal3);
                            }
                            else if ((OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsumeWithoutResult) || (OperCG === PrologPlusCG.prolog.DataTypes.e_partialContract) || (OperCG === PrologPlusCG.prolog.DataTypes.e_completeContract)) {
                                if (this.env.compile.set1IsSubsetOfSet2(setVal1, setVal2)) {
                                    if (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) {
                                        C3.m_pdReferent = valIndRight.pData.myCopy();
                                    }
                                }
                                else {
                                    bResult = false;
                                }
                            }
                        }
                        else if ((typeof valIndLeft.pData.data === 'string') && (valIndRight.pData.data != null && valIndRight.pData.data instanceof PrologPlusCG.prolog.PrologList)) {
                            var sVal1 = valIndLeft.pData.data;
                            var setVal2 = valIndRight.pData.data;
                            var setVal3 = null;
                            if (OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin) {
                                setVal3 = this.env.compile.union(valIndLeft.pData, setVal2);
                                C3.m_pdReferent = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uSet, setVal3);
                                bResult = this.aUnifyCG.conform(C3.m_pdReferent, valIndLeft.index, C3.m_pdType.data);
                            }
                            else if (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize) {
                                if (this.env.compile.hasString(sVal1, setVal2)) {
                                    C3.m_pdReferent = valIndLeft.pData.myCopy();
                                }
                                else {
                                    C3.m_pdReferent = null;
                                }
                            }
                            else if ((OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsumeWithoutResult) || (OperCG === PrologPlusCG.prolog.DataTypes.e_partialContract) || (OperCG === PrologPlusCG.prolog.DataTypes.e_completeContract)) {
                                if (this.env.compile.hasString(sVal1, setVal2)) {
                                    if (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) {
                                        C3.m_pdReferent = valIndRight.pData.myCopy();
                                    }
                                }
                                else {
                                    bResult = false;
                                }
                            }
                        }
                        else if ((valIndLeft.pData.data != null && valIndLeft.pData.data instanceof PrologPlusCG.prolog.PrologList) && (typeof valIndRight.pData.data === 'string')) {
                            var setVal1 = valIndLeft.pData.data;
                            var sVal2 = valIndRight.pData.data;
                            var setVal3 = null;
                            if (OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin) {
                                setVal3 = this.env.compile.union(valIndRight.pData, setVal1);
                                C3.m_pdReferent = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uSet, setVal3);
                                bResult = this.aUnifyCG.conform(C3.m_pdReferent, valIndLeft.index, C3.m_pdType.data);
                            }
                            else if (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize) {
                                if (this.env.compile.hasString(sVal2, setVal1)) {
                                    C3.m_pdReferent = valIndRight.pData.myCopy();
                                }
                                else {
                                    C3.m_pdReferent = null;
                                }
                            }
                            else if ((OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsumeWithoutResult) || (OperCG === PrologPlusCG.prolog.DataTypes.e_partialContract) || (OperCG === PrologPlusCG.prolog.DataTypes.e_completeContract)) {
                                if ((setVal1.size() === 1) && this.env.compile.hasString(sVal2, setVal1)) {
                                    if (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) {
                                        C3.m_pdReferent = valIndRight.pData.myCopy();
                                    }
                                }
                                else {
                                    bResult = false;
                                }
                            }
                        }
                    }
                    else {
                        switch ((OperCG)) {
                            case 31 /* e_maximalJoin */:
                                {
                                    if ((valIndLeft != null) && (valIndLeft.pData != null)) {
                                        C3.m_pdReferent = valIndLeft.pData.myCopy();
                                        bResult = this.aUnifyCG.conform(C3.m_pdReferent, valIndLeft.index, C3.m_pdType.data);
                                    }
                                    else if ((valIndRight != null) && (valIndRight.pData != null)) {
                                        C3.m_pdReferent = valIndRight.pData.myCopy();
                                        bResult = this.aUnifyCG.conform(C3.m_pdReferent, valIndRight.index, C3.m_pdType.data);
                                    }
                                }
                                ;
                                break;
                            case 33 /* e_subsume */:
                                {
                                    if ((Ref1 == null) || ((typeof Ref1.data === 'string') && (Ref1.data === ("super"))) || (valIndLeft.pData == null)) {
                                        C3.m_pdReferent = valIndRight.pData.myCopy();
                                    }
                                    else {
                                        bResult = false;
                                    }
                                }
                                ;
                                break;
                            case 34 /* e_subsumeWithoutResult */:
                            case 36 /* e_partialContract */:
                            case 35 /* e_completeContract */:
                                bResult = ((Ref1 == null) || ((typeof Ref1.data === 'string') && (Ref1.data === ("super"))) || (valIndLeft.pData == null));
                                break;
                            case 32 /* e_generalize */:
                                bResult = true;
                                break;
                        }
                    }
                }
                return bResult;
            };
            CGOperation.prototype.matchValue = function (OperCG, Val1, level1, Val2, level2, C3) {
                var bResult = true;
                var valIndLeft;
                if (Val1 != null) {
                    valIndLeft = this.env.unification.valueFromUnifStack(Val1, level1);
                }
                else {
                    valIndLeft = null;
                }
                var valIndRight;
                if (Val2 != null) {
                    valIndRight = this.env.unification.valueFromUnifStack(Val2, level2);
                }
                else {
                    valIndRight = null;
                }
                if (((Val1 == null) || (valIndLeft.pData == null)) && ((Val2 == null) || (valIndRight.pData == null))) {
                    bResult = true;
                }
                else {
                    if ((valIndLeft != null) && (valIndLeft.pData != null) && (valIndRight != null) && (valIndRight.pData != null)) {
                        if ((valIndLeft.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) && (valIndRight.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)) {
                            var sval1 = valIndLeft.pData.data;
                            var sval2 = valIndRight.pData.data;
                            var resMatchCG = new PrologPlusCG.cg.CGMatchResult(new PrologPlusCG.cg.CG(), null);
                            var operCGImb = new CGOperation(this.env);
                            bResult = operCGImb.matchCG(OperCG, null, sval1, level1, null, sval2, level2, resMatchCG);
                            operCGImb = null;
                            if (bResult && ((OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize))) {
                                C3.m_pdValue = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uCG, resMatchCG.G3);
                            }
                            resMatchCG = null;
                        }
                        else if (this.valuesAreEqual(valIndLeft.pData, valIndRight.pData)) {
                            if ((OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize)) {
                                C3.m_pdValue = new PrologPlusCG.prolog.PrologData(valIndLeft.pData.typeOfData, valIndRight.pData.data);
                            }
                        }
                        else if (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize) {
                            C3.m_pdValue = null;
                        }
                        else {
                            bResult = false;
                        }
                    }
                    else {
                        switch ((OperCG)) {
                            case 31 /* e_maximalJoin */:
                                {
                                    if ((valIndLeft != null) && (valIndLeft.pData != null)) {
                                        C3.m_pdValue = new PrologPlusCG.prolog.PrologData(valIndLeft.pData.typeOfData, valIndLeft.pData.data);
                                    }
                                    else if ((valIndRight != null) && (valIndRight.pData != null)) {
                                        C3.m_pdValue = new PrologPlusCG.prolog.PrologData(valIndRight.pData.typeOfData, valIndRight.pData.data);
                                    }
                                }
                                ;
                                break;
                            case 33 /* e_subsume */:
                                {
                                    bResult = ((Val1 == null) || (valIndLeft.pData == null));
                                    C3.m_pdValue = new PrologPlusCG.prolog.PrologData(valIndRight.pData.typeOfData, valIndRight.pData.data);
                                }
                                ;
                                break;
                            case 34 /* e_subsumeWithoutResult */:
                            case 36 /* e_partialContract */:
                            case 35 /* e_completeContract */:
                                bResult = ((Val1 == null) || (valIndLeft.pData == null));
                                break;
                            case 32 /* e_generalize */:
                                bResult = true;
                                break;
                        }
                    }
                }
                return bResult;
            };
            CGOperation.prototype.valuesAreEqual = function (Val1, Val2) {
                if ((Val1.typeOfData !== Val2.typeOfData) || !(function (o1, o2) { return o1 && o1.equals ? o1.equals(o2) : o1 === o2; })(Val1.data, Val2.data)) {
                    return false;
                }
                else {
                    return true;
                }
            };
            CGOperation.prototype.LocaliseOrAdd = function (OperCG, Ref1, Ref2, C3) {
                var BRes = true;
                var existe = false;
                var sRef1 = null;
                var sRef2 = null;
                if ((Ref1 != null) && (typeof Ref1.data === 'string')) {
                    sRef1 = Ref1.data;
                }
                if ((Ref2 != null) && (typeof Ref2.data === 'string')) {
                    sRef2 = Ref2.data;
                }
                if ((sRef1 == null) && (sRef2 == null)) {
                    return true;
                }
                var E = null;
                for (var e = (function (a) { var i = 0; return { nextElement: function () { return i < a.length ? a[i++] : null; }, hasMoreElements: function () { return i < a.length; } }; })(this.corefMatchVec); e.hasMoreElements() && !existe;) {
                    {
                        E = e.nextElement();
                        existe = ((sRef1 != null) && (E.Var1 != null) && (E.Var1 === sRef1)) || ((sRef2 != null) && (E.Var2 != null) && (E.Var2 === sRef2));
                    }
                    ;
                }
                if (existe) {
                    if ((sRef1 != null) && (E.Var1 != null)) {
                        BRes = E.Var1 === sRef1;
                    }
                    if (BRes && (sRef2 != null) && (E.Var2 != null)) {
                        BRes = E.Var2 === sRef2;
                    }
                    if (BRes) {
                        if ((E.Var3 != null) && !this["in"](OperCG, this.setOpersId, 2)) {
                            C3.m_pdReferent = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uVariable, E.Var3);
                        }
                    }
                }
                else if (this.isCoreferent(Ref1) || this.isCoreferent(Ref2)) {
                    if (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) {
                        if ((sRef1 != null) && (sRef2 == null)) {
                            BRes = false;
                        }
                        else {
                            C3.m_pdReferent = Ref2.myCopy();
                            /* addElement */ (this.corefMatchVec.push(new PrologPlusCG.cg.CoreferenceMatch(sRef1, sRef2, C3.m_pdReferent.data)) > 0);
                        }
                    }
                    else if (OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin) {
                        if (this.isCoreferent(Ref1)) {
                            C3.m_pdReferent = Ref1.myCopy();
                        }
                        else {
                            C3.m_pdReferent = Ref2.myCopy();
                        }
                        /* addElement */ (this.corefMatchVec.push(new PrologPlusCG.cg.CoreferenceMatch(sRef1, sRef2, C3.m_pdReferent.data)) > 0);
                    }
                }
                return BRes;
            };
            CGOperation.prototype["in"] = function (v, vctByte, indLastElem) {
                var bFound = false;
                for (var i = 0; (i <= indLastElem) && !bFound; i++) {
                    {
                        bFound = (vctByte[i] === v);
                    }
                    ;
                }
                return bFound;
            };
            return CGOperation;
        }());
        cg.CGOperation = CGOperation;
        CGOperation["__class"] = "PrologPlusCG.cg.CGOperation";
        CGOperation["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];
    })(cg = PrologPlusCG.cg || (PrologPlusCG.cg = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var cg;
    (function (cg) {
        var Concept = /** @class */ (function () {
            function Concept(Typ, Ref, Val, myenv) {
                if (((Typ != null && Typ instanceof PrologPlusCG.prolog.PrologData) || Typ === null) && ((Ref != null && Ref instanceof PrologPlusCG.prolog.PrologData) || Ref === null) && ((Val != null && Val instanceof PrologPlusCG.prolog.PrologData) || Val === null) && ((myenv != null && myenv instanceof PrologPlusCG.prolog.PPCGEnv) || myenv === null)) {
                    var __args = arguments;
                    if (this.m_pdType === undefined) {
                        this.m_pdType = null;
                    }
                    if (this.m_pdReferent === undefined) {
                        this.m_pdReferent = null;
                    }
                    if (this.m_pdValue === undefined) {
                        this.m_pdValue = null;
                    }
                    if (this.m_vctIncomingRelations === undefined) {
                        this.m_vctIncomingRelations = null;
                    }
                    if (this.m_vctOutgoingRelations === undefined) {
                        this.m_vctOutgoingRelations = null;
                    }
                    this.env = null;
                    this.env = myenv;
                    this.m_pdType = Typ;
                    this.m_pdReferent = Ref;
                    this.m_pdValue = Val;
                    this.m_vctIncomingRelations = ([]);
                    this.m_vctOutgoingRelations = ([]);
                }
                else if (((Typ != null && Typ instanceof PrologPlusCG.prolog.PPCGEnv) || Typ === null) && Ref === undefined && Val === undefined && myenv === undefined) {
                    var __args = arguments;
                    var myenv_1 = __args[0];
                    if (this.m_pdType === undefined) {
                        this.m_pdType = null;
                    }
                    if (this.m_pdReferent === undefined) {
                        this.m_pdReferent = null;
                    }
                    if (this.m_pdValue === undefined) {
                        this.m_pdValue = null;
                    }
                    if (this.m_vctIncomingRelations === undefined) {
                        this.m_vctIncomingRelations = null;
                    }
                    if (this.m_vctOutgoingRelations === undefined) {
                        this.m_vctOutgoingRelations = null;
                    }
                    this.env = null;
                    this.env = myenv_1;
                    this.m_pdType = null;
                    this.m_pdReferent = null;
                    this.m_pdValue = null;
                    this.m_vctIncomingRelations = ([]);
                    this.m_vctOutgoingRelations = ([]);
                }
                else
                    throw new Error('invalid overload');
            }
            Concept.prototype.finalize = function () {
                this.m_pdType = null;
                this.m_pdReferent = null;
                this.m_pdValue = null;
                /* clear */ (this.m_vctIncomingRelations.length = 0);
                /* clear */ (this.m_vctOutgoingRelations.length = 0);
            };
            Concept.prototype.myCopy = function () {
                var nouvConc = new Concept(this.env);
                nouvConc.m_pdType = this.m_pdType.myCopy();
                if (this.m_pdReferent != null) {
                    nouvConc.m_pdReferent = this.m_pdReferent.myCopy();
                }
                if (this.m_pdValue != null) {
                    nouvConc.m_pdValue = this.m_pdValue.myCopy();
                }
                return nouvConc;
            };
            Concept.prototype.copyValue = function (level) {
                var newConcept = new Concept(this.env);
                var ValType = this.env.unification.valueFromUnifStack(this.m_pdType, level);
                newConcept.m_pdType = ValType.pData.myCopy();
                if (this.m_pdReferent != null) {
                    var ValRef = this.env.unification.valueFromUnifStack(this.m_pdReferent, level);
                    if (ValRef.pData != null) {
                        newConcept.m_pdReferent = ValRef.pData.myCopy();
                    }
                }
                if (this.m_pdValue != null) {
                    var ValVal = this.env.unification.valueFromUnifStack(this.m_pdValue, level);
                    if (ValVal.pData != null) {
                        newConcept.m_pdValue = ValVal.pData.myCopy();
                    }
                }
                return newConcept;
            };
            /**
             * Ajouter une relation en entr?e au concept
             * @param {PrologPlusCG.cg.Relation} rel
             */
            Concept.prototype.addIncomingRelation = function (rel) {
                /* addElement */ (this.m_vctIncomingRelations.push(rel) > 0);
            };
            /**
             * Ajouter une relation en entr?e au concept
             * @param {PrologPlusCG.cg.Relation} rel
             */
            Concept.prototype.addOutgoingRelation = function (rel) {
                /* addElement */ (this.m_vctOutgoingRelations.push(rel) > 0);
            };
            /**
             * Enlever une relation en sortie du concept
             * @param {PrologPlusCG.cg.Relation} rel
             */
            Concept.prototype.removeOutgoingRelation = function (rel) {
                /* removeElement */ (function (a) { var index = a.indexOf(rel); if (index >= 0) {
                    a.splice(index, 1);
                    return true;
                }
                else {
                    return false;
                } })(this.m_vctOutgoingRelations);
            };
            /**
             * Enlever une relation en entr?e du concept
             * @param {PrologPlusCG.cg.Relation} rel
             */
            Concept.prototype.removeIncomingRelation = function (rel) {
                /* removeElement */ (function (a) { var index = a.indexOf(rel); if (index >= 0) {
                    a.splice(index, 1);
                    return true;
                }
                else {
                    return false;
                } })(this.m_vctIncomingRelations);
            };
            return Concept;
        }());
        cg.Concept = Concept;
        Concept["__class"] = "PrologPlusCG.cg.Concept";
        Concept["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];
    })(cg = PrologPlusCG.cg || (PrologPlusCG.cg = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var cg;
    (function (cg) {
        var ConceptMatch = /** @class */ (function () {
            function ConceptMatch(C1, C2, C3, B1, B2) {
                if (this.m_ConcMatched1 === undefined) {
                    this.m_ConcMatched1 = null;
                }
                if (this.m_ConcMatched2 === undefined) {
                    this.m_ConcMatched2 = null;
                }
                if (this.m_ResultOfMatch === undefined) {
                    this.m_ResultOfMatch = null;
                }
                if (this.m_IsConcMatched === undefined) {
                    this.m_IsConcMatched = false;
                }
                if (this.m_IsMatchedLocally === undefined) {
                    this.m_IsMatchedLocally = false;
                }
                this.m_ConcMatched1 = C1;
                this.m_ConcMatched2 = C2;
                this.m_ResultOfMatch = C3;
                this.m_IsConcMatched = B1;
                this.m_IsMatchedLocally = B2;
            }
            ConceptMatch.prototype.myDestroy = function () {
                this.m_ConcMatched1 = null;
                this.m_ConcMatched2 = null;
                this.m_ResultOfMatch = null;
            };
            return ConceptMatch;
        }());
        cg.ConceptMatch = ConceptMatch;
        ConceptMatch["__class"] = "PrologPlusCG.cg.ConceptMatch";
    })(cg = PrologPlusCG.cg || (PrologPlusCG.cg = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var cg;
    (function (cg) {
        var ConceptMatchResult = /** @class */ (function () {
            function ConceptMatchResult(b, c) {
                if (this.bRes === undefined) {
                    this.bRes = false;
                }
                if (this.C3 === undefined) {
                    this.C3 = null;
                }
                this.bRes = b;
                this.C3 = c;
            }
            return ConceptMatchResult;
        }());
        cg.ConceptMatchResult = ConceptMatchResult;
        ConceptMatchResult["__class"] = "PrologPlusCG.cg.ConceptMatchResult";
    })(cg = PrologPlusCG.cg || (PrologPlusCG.cg = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var cg;
    (function (cg) {
        var ConceptPair = /** @class */ (function () {
            function ConceptPair(conc1, conc2) {
                if (((conc1 != null && conc1 instanceof PrologPlusCG.cg.Concept) || conc1 === null) && ((conc2 != null && conc2 instanceof PrologPlusCG.cg.Concept) || conc2 === null)) {
                    var __args = arguments;
                    if (this.m_initialConcept === undefined) {
                        this.m_initialConcept = null;
                    }
                    if (this.m_conceptCopy === undefined) {
                        this.m_conceptCopy = null;
                    }
                    this.m_initialConcept = conc1;
                    this.m_conceptCopy = conc2;
                }
                else if (conc1 === undefined && conc2 === undefined) {
                    var __args = arguments;
                    if (this.m_initialConcept === undefined) {
                        this.m_initialConcept = null;
                    }
                    if (this.m_conceptCopy === undefined) {
                        this.m_conceptCopy = null;
                    }
                }
                else
                    throw new Error('invalid overload');
            }
            return ConceptPair;
        }());
        cg.ConceptPair = ConceptPair;
        ConceptPair["__class"] = "PrologPlusCG.cg.ConceptPair";
    })(cg = PrologPlusCG.cg || (PrologPlusCG.cg = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var cg;
    (function (cg) {
        var CoreferenceMatch = /** @class */ (function () {
            function CoreferenceMatch(v1, v2, v3) {
                if (this.Var1 === undefined) {
                    this.Var1 = null;
                }
                if (this.Var2 === undefined) {
                    this.Var2 = null;
                }
                if (this.Var3 === undefined) {
                    this.Var3 = null;
                }
                this.Var1 = v1;
                this.Var2 = v2;
                this.Var3 = v3;
            }
            CoreferenceMatch.prototype.myDestroy = function () {
                this.Var1 = null;
                this.Var2 = null;
                this.Var3 = null;
            };
            return CoreferenceMatch;
        }());
        cg.CoreferenceMatch = CoreferenceMatch;
        CoreferenceMatch["__class"] = "PrologPlusCG.cg.CoreferenceMatch";
    })(cg = PrologPlusCG.cg || (PrologPlusCG.cg = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var cg;
    (function (cg) {
        var Relation = /** @class */ (function () {
            function Relation(IdRel, concSrce, concDest) {
                if (((IdRel != null && IdRel instanceof PrologPlusCG.prolog.PrologData) || IdRel === null) && ((concSrce != null && concSrce instanceof PrologPlusCG.cg.Concept) || concSrce === null) && ((concDest != null && concDest instanceof PrologPlusCG.cg.Concept) || concDest === null)) {
                    var __args = arguments;
                    if (this.m_pdRelationName === undefined) {
                        this.m_pdRelationName = null;
                    }
                    if (this.m_concSource === undefined) {
                        this.m_concSource = null;
                    }
                    if (this.m_concDestination === undefined) {
                        this.m_concDestination = null;
                    }
                    this.m_pdRelationName = IdRel;
                    this.m_concSource = concSrce;
                    this.m_concDestination = concDest;
                    this.m_concSource.addOutgoingRelation(this);
                    this.m_concDestination.addIncomingRelation(this);
                }
                else if (IdRel === undefined && concSrce === undefined && concDest === undefined) {
                    var __args = arguments;
                    if (this.m_pdRelationName === undefined) {
                        this.m_pdRelationName = null;
                    }
                    if (this.m_concSource === undefined) {
                        this.m_concSource = null;
                    }
                    if (this.m_concDestination === undefined) {
                        this.m_concDestination = null;
                    }
                    this.m_pdRelationName = null;
                    this.m_concSource = null;
                    this.m_concDestination = null;
                }
                else
                    throw new Error('invalid overload');
            }
            Relation.prototype.myCopy = function () {
                var newRelation = new Relation();
                newRelation.m_pdRelationName = this.m_pdRelationName.myCopy();
                return newRelation;
            };
            Relation.prototype.finalize = function () {
                this.m_pdRelationName = null;
                this.m_concSource = null;
                this.m_concDestination = null;
            };
            return Relation;
        }());
        cg.Relation = Relation;
        Relation["__class"] = "PrologPlusCG.cg.Relation";
    })(cg = PrologPlusCG.cg || (PrologPlusCG.cg = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var cg;
    (function (cg) {
        var RelationMatch = /** @class */ (function () {
            function RelationMatch(r1, r2) {
                if (this.m_RelMatched1 === undefined) {
                    this.m_RelMatched1 = null;
                }
                if (this.m_RelMatched2 === undefined) {
                    this.m_RelMatched2 = null;
                }
                this.m_RelMatched1 = r1;
                this.m_RelMatched2 = r2;
            }
            RelationMatch.prototype.myDestroy = function () {
                this.m_RelMatched1 = null;
                this.m_RelMatched2 = null;
            };
            return RelationMatch;
        }());
        cg.RelationMatch = RelationMatch;
        RelationMatch["__class"] = "PrologPlusCG.cg.RelationMatch";
    })(cg = PrologPlusCG.cg || (PrologPlusCG.cg = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var PPCGJS = /** @class */ (function () {
        function PPCGJS(strConsoleElementDOMSelector) {
            if (((typeof strConsoleElementDOMSelector === 'string') || strConsoleElementDOMSelector === null)) {
                var __args = arguments;
                this.env = null;
                this.io = null;
                this.init(strConsoleElementDOMSelector);
            }
            else if (strConsoleElementDOMSelector === undefined) {
                var __args = arguments;
                this.env = null;
                this.io = null;
                this.init("#console");
            }
            else
                throw new Error('invalid overload');
        }
        /*private*/ PPCGJS.prototype.init = function (strConsoleElementDOMSelector) {
            this.env = new PrologPlusCG.prolog.PPCGEnv();
            this.io = new PrologPlusCG.PPCGIO_JS(this.env, strConsoleElementDOMSelector);
            this.env.io = this.io;
        };
        PPCGJS.prototype.getErrorMessage = function () {
            return this.env.getAndClearErrorMessage();
        };
        PPCGJS.prototype.compileProgram = function (program) {
            this.env.PurgeMemory();
            this.io.setProgramText(program);
            return this.env.compileProgram();
        };
        PPCGJS.prototype.getResolutions = function (query, bConvertResults) {
            return this.env.Resolve$java_lang_String$boolean(query, bConvertResults);
        };
        /**
         * Execute the query, and if there were any resolutions, return true, otherwise, return false.
         * @param {string} query The goal to execute.
         * @return {boolean} true iff there was at least one result.
         */
        PPCGJS.prototype.runQuery = function (query) {
            var result = this.getResolutions(query, true);
            if (result != null) {
                return true;
            }
            else {
                return false;
            }
        };
        return PPCGJS;
    }());
    PrologPlusCG.PPCGJS = PPCGJS;
    PPCGJS["__class"] = "PrologPlusCG.PPCGJS";
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var Compile = /** @class */ (function () {
            function Compile(myenv) {
                if (this.CompileTxt === undefined) {
                    this.CompileTxt = null;
                }
                if (this.textEndIndex === undefined) {
                    this.textEndIndex = 0;
                }
                this.curChar = ' ';
                this.curCharIndex = 0;
                this.curLineNumber = 1;
                if (this.token === undefined) {
                    this.token = null;
                }
                if (this.nTokenType === undefined) {
                    this.nTokenType = 0;
                }
                this.valSysSP = "#$SP$#";
                this.valSysINST = "#$INST$#";
                this.valSysGEN = "#$GEN$#";
                this.valSysIdVar = "#$VAR1$#";
                this.valSysCleCG = "#$CG$#";
                this.valSysCleBtCp = "#$BtCp$#";
                this.vctUnitTyp = ([]);
                this.currElem = 0;
                this.vctVariableIdentifiersInQuery = ([]);
                this.env = null;
                this.env = myenv;
            }
            Compile.prototype.identifierIsVar = function (ident) {
                var bIsVar;
                if (ident.length >= 2) {
                    bIsVar = ( /* isDigit *//\d/.test(ident.charAt(1)[0]) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(ident.charAt(1)) == '_'.charCodeAt(0)) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(ident.charAt(0)) == '_'.charCodeAt(0)));
                }
                else {
                    bIsVar = true;
                }
                return bIsVar;
            };
            /**
             * a) Lexical analysis
             * @return {string}
             */
            Compile.prototype.nextChar = function () {
                return this.CompileTxt.charAt(this.curCharIndex);
            };
            Compile.prototype.readChar = function () {
                if (this.curCharIndex === this.textEndIndex) {
                    this.curChar = '\n';
                    throw new PrologPlusCG.prolog.CompileException("End Of Text");
                }
                this.curChar = this.CompileTxt.charAt(this.curCharIndex);
                this.curCharIndex++;
                var ignorer = true;
                while ((ignorer)) {
                    {
                        try {
                            while (((((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '\n'.charCodeAt(0)) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '\r'.charCodeAt(0))) && (this.curCharIndex < this.textEndIndex))) {
                                {
                                    if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '\n'.charCodeAt(0))
                                        this.curLineNumber++;
                                    this.curChar = this.CompileTxt.charAt(this.curCharIndex);
                                    this.curCharIndex++;
                                }
                            }
                            ;
                        }
                        catch (sioobe) {
                            throw new PrologPlusCG.prolog.CompileException("StringIndexOutOfBoundsException");
                        }
                        if (((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '/'.charCodeAt(0)) && (this.curCharIndex < this.textEndIndex) && ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.CompileTxt.charAt(this.curCharIndex)) == '/'.charCodeAt(0))) {
                            try {
                                while ((((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) != '\n'.charCodeAt(0)) && (this.curCharIndex < this.textEndIndex))) {
                                    {
                                        this.curChar = this.CompileTxt.charAt(this.curCharIndex);
                                        this.curCharIndex++;
                                    }
                                }
                                ;
                                this.curLineNumber++;
                            }
                            catch (sioobe) {
                                throw new PrologPlusCG.prolog.CompileException("StringIndexOutOfBoundsException");
                            }
                        }
                        if (this.curCharIndex === this.textEndIndex) {
                            ignorer = false;
                        }
                        else if (((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '\r'.charCodeAt(0) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '\n'.charCodeAt(0)))) {
                            ignorer = true;
                        }
                        else if (((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '/'.charCodeAt(0)) && ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.CompileTxt.charAt(this.curCharIndex)) == '/'.charCodeAt(0))) {
                            ignorer = true;
                        }
                        else {
                            ignorer = false;
                        }
                    }
                }
                ;
            };
            Compile.prototype.eatWhiteSpace = function () {
                this.readChar();
                while ((((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == ' '.charCodeAt(0)) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '\n'.charCodeAt(0)) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '\t'.charCodeAt(0)) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '\r'.charCodeAt(0)))) {
                    this.readChar();
                }
                ;
            };
            Compile.isSpaceChar = function (c) {
                return ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(c) == ' '.charCodeAt(0)) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(c) == '\n'.charCodeAt(0)) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(c) == '\r'.charCodeAt(0)) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(c) == '\t'.charCodeAt(0));
            };
            Compile.prototype.isIdVar = function () {
                if ( /* length */this.token.str.length >= 2) {
                    return ( /* isDigit *//\d/.test(/* charAt */ this.token.str.charAt(1)[0]) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(/* charAt */ this.token.str.charAt(1)) == '_'.charCodeAt(0)) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(/* charAt */ this.token.str.charAt(0)) == '_'.charCodeAt(0)));
                }
                else {
                    return true;
                }
            };
            Compile.prototype.readToken = function (bGenerateCode) {
                var _this = this;
                if (bGenerateCode) {
                    if (this.currElem === /* size */ this.vctUnitTyp.length) {
                        throw new PrologPlusCG.prolog.CompileException("End Of Text");
                    }
                    this.token = this.vctUnitTyp[this.currElem].unit;
                    this.nTokenType = this.vctUnitTyp[this.currElem].typUnit;
                    this.currElem++;
                    return;
                }
                this.token = { str: "", toString: function () { return this.str; } };
                if (Compile.isSpaceChar(this.curChar) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '\t'.charCodeAt(0)) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '\r'.charCodeAt(0))) {
                    this.eatWhiteSpace();
                }
                if ( /* isLetter *//[a-zA-Z]/.test(this.curChar[0])) {
                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                    try {
                        this.readChar();
                        while (( /* isLetterOrDigit *//[a-zA-Z\d]/.test(this.curChar[0]) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '_'.charCodeAt(0)))) {
                            {
                                /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                this.readChar();
                            }
                        }
                        ;
                    }
                    catch (e1) {
                        if (!(e1.message === ("End Of Text"))) {
                            throw new PrologPlusCG.prolog.CompileException("Error during the reading of an identifier " + /* toString */ this.token.str + " at line " + this.curLineNumber);
                        }
                    }
                    if (this.isIdVar()) {
                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uVariable;
                    }
                    else {
                        var uniteStr = this.token.str;
                        uniteStr = uniteStr.toLowerCase();
                        if ((uniteStr === ("true")) || (uniteStr === ("false"))) {
                            this.nTokenType = PrologPlusCG.prolog.DataTypes.uBoolean;
                            this.token = { str: uniteStr, toString: function () { return this.str; } };
                        }
                        else {
                            this.nTokenType = PrologPlusCG.prolog.DataTypes.uIdentifier;
                        }
                        uniteStr = null;
                    }
                }
                else if ((((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '-'.charCodeAt(0)) && /* isDigit */ /\d/.test(this.nextChar()[0])) || /* isDigit */ /\d/.test(this.curChar[0])) {
                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                    try {
                        this.readChar();
                        while (( /* isDigit *//\d/.test(this.curChar[0]))) {
                            {
                                /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                this.readChar();
                            }
                        }
                        ;
                        if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '.'.charCodeAt(0)) {
                            /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                            this.readChar();
                            while (( /* isDigit *//\d/.test(this.curChar[0]))) {
                                {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.readChar();
                                }
                            }
                            ;
                        }
                    }
                    catch (e1) {
                        if (!(e1.message === ("End Of Text"))) {
                            throw new PrologPlusCG.prolog.CompileException("Error during the reading of a number " + /* toString */ this.token.str + " at line " + this.curLineNumber);
                        }
                    }
                    this.nTokenType = PrologPlusCG.prolog.DataTypes.uNumber;
                }
                else {
                    switch ((this.curChar).charCodeAt(0)) {
                        case 34 /* '\"' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += '\"'; return sb; })(this.token);
                                    try {
                                        this.readChar();
                                    }
                                    catch (e1) {
                                        if (!(e1.message === ("End Of Text"))) {
                                            throw new PrologPlusCG.prolog.CompileException("Error during the reading of a string " + /* toString */ this.token.str + " at line " + this.curLineNumber);
                                        }
                                    }
                                    while (((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) != '\"'.charCodeAt(0))) {
                                        {
                                            /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                            try {
                                                this.readChar();
                                            }
                                            catch (e1a) {
                                                if (!(e1a.message === ("End Of Text"))) {
                                                    throw new PrologPlusCG.prolog.CompileException("Error during the reading of a string " + /* toString */ this.token.str + " at line " + this.curLineNumber);
                                                }
                                            }
                                        }
                                    }
                                    ;
                                    /* append */ (function (sb) { sb.str += '\"'; return sb; })(this.token);
                                    this.readChar();
                                }
                                catch (e1b) {
                                    if (!(e1b.message === ("End Of Text"))) {
                                        throw new PrologPlusCG.prolog.CompileException("Error in reading a string " + /* toString */ this.token.str + " at line " + this.curLineNumber);
                                    }
                                }
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uString;
                            }
                            ;
                            break;
                        case 58 /* ':' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.readChar();
                                    if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '-'.charCodeAt(0)) {
                                        /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uEntails;
                                        this.readChar();
                                    }
                                    else if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == ':'.charCodeAt(0)) {
                                        /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uDoubleColon;
                                        this.readChar();
                                    }
                                    else {
                                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uColon;
                                    }
                                }
                                catch (e1) {
                                    throw new PrologPlusCG.prolog.CompileException(e1.message + "\n Error in reading the :- symbol at line " + this.curLineNumber);
                                }
                            }
                            ;
                            break;
                        case 45 /* '-' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.readChar();
                                    if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '>'.charCodeAt(0)) {
                                        /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uRightArrow;
                                        this.readChar();
                                    }
                                    else {
                                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uMinus;
                                    }
                                }
                                catch (e1) {
                                    throw new PrologPlusCG.prolog.CompileException("Error in reading the , symbol at line " + this.curLineNumber);
                                }
                            }
                            ;
                            break;
                        case 60 /* '<' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.readChar();
                                    if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '-'.charCodeAt(0)) {
                                        /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uLeftArrow;
                                        this.readChar();
                                    }
                                    else {
                                        throw new PrologPlusCG.prolog.CompileException("Error in reading the < symbol at line " + this.curLineNumber);
                                    }
                                }
                                catch (e1) {
                                    throw new PrologPlusCG.prolog.CompileException("Error in reading the < symbol at line " + this.curLineNumber);
                                }
                            }
                            ;
                            break;
                        case 44 /* ',' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.nTokenType = PrologPlusCG.prolog.DataTypes.uComma;
                                    this.readChar();
                                }
                                catch (e1) {
                                    throw new PrologPlusCG.prolog.CompileException("Error in reading the , symbol at line " + this.curLineNumber);
                                }
                            }
                            ;
                            break;
                        case 59 /* ';' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.nTokenType = PrologPlusCG.prolog.DataTypes.uSemicolon;
                                    this.readChar();
                                }
                                catch (e1) {
                                    throw new PrologPlusCG.prolog.CompileException("Error in reading the ; symbol at line " + this.curLineNumber);
                                }
                            }
                            ;
                            break;
                        case 33 /* '!' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.nTokenType = PrologPlusCG.prolog.DataTypes.uExclamationMark;
                                    this.readChar();
                                }
                                catch (e1) {
                                    if (!(e1.message === ("End Of Text"))) {
                                        throw new PrologPlusCG.prolog.CompileException("Error in reading the ! symbol at line " + this.curLineNumber);
                                    }
                                }
                            }
                            ;
                            break;
                        case 63 /* '?' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.nTokenType = PrologPlusCG.prolog.DataTypes.uQuestionMark;
                                    this.readChar();
                                }
                                catch (e1) {
                                    if (!(e1.message === ("End Of Text"))) {
                                        throw new PrologPlusCG.prolog.CompileException("Error in reading the ? symbol at line " + this.curLineNumber);
                                    }
                                }
                            }
                            ;
                            break;
                        case 61 /* '=' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.nTokenType = PrologPlusCG.prolog.DataTypes.uEqualsSign;
                                    this.readChar();
                                }
                                catch (e1) {
                                    throw new PrologPlusCG.prolog.CompileException("Error in reading the = symbol at line " + this.curLineNumber);
                                }
                            }
                            ;
                            break;
                        case 91 /* '[' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.nTokenType = PrologPlusCG.prolog.DataTypes.uOpenBracket;
                                    this.readChar();
                                }
                                catch (e1) {
                                    throw new PrologPlusCG.prolog.CompileException("Error in reading the [ symbol at line " + this.curLineNumber);
                                }
                            }
                            ;
                            break;
                        case 93 /* ']' */:
                            {
                                /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uCloseBracket;
                                try {
                                    this.readChar();
                                }
                                catch (e1) {
                                    if (!(e1.message === ("End Of Text"))) {
                                        throw new PrologPlusCG.prolog.CompileException("Error after reading the character ] at line " + this.curLineNumber);
                                    }
                                }
                            }
                            ;
                            break;
                        case 123 /* '{' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.nTokenType = PrologPlusCG.prolog.DataTypes.uOpenBrace;
                                    this.readChar();
                                }
                                catch (e1) {
                                    throw new PrologPlusCG.prolog.CompileException("Error in reading the { symbol at line " + this.curLineNumber);
                                }
                            }
                            ;
                            break;
                        case 125 /* '}' */:
                            {
                                /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uCloseBrace;
                                try {
                                    this.readChar();
                                }
                                catch (e1) {
                                    if (!(e1.message === ("End Of Text"))) {
                                        throw new PrologPlusCG.prolog.CompileException("Error after reading the character } at line " + this.curLineNumber);
                                    }
                                }
                            }
                            ;
                            break;
                        case 38 /* '&' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.nTokenType = PrologPlusCG.prolog.DataTypes.uAmpersAnd;
                                    this.readChar();
                                }
                                catch (e1) {
                                    throw new PrologPlusCG.prolog.CompileException("Error in reading the & symbol at line " + this.curLineNumber);
                                }
                            }
                            ;
                            break;
                        case 62 /* '>' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.nTokenType = PrologPlusCG.prolog.DataTypes.uGreaterThan;
                                    this.readChar();
                                }
                                catch (e1) {
                                    throw new PrologPlusCG.prolog.CompileException("Error in reading the > symbol at line " + this.curLineNumber);
                                }
                            }
                            ;
                            break;
                        case 95 /* '_' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.readChar();
                                    while (( /* isLetterOrDigit *//[a-zA-Z\d]/.test(this.curChar[0]) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '_'.charCodeAt(0)))) {
                                        {
                                            /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                            this.readChar();
                                        }
                                    }
                                    ;
                                }
                                catch (e1) {
                                    if (!(e1.message === ("End Of Text"))) {
                                        throw new PrologPlusCG.prolog.CompileException("Error in reading a variable identifier " + /* toString */ this.token.str + " at line " + this.curLineNumber);
                                    }
                                }
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uVariable;
                            }
                            ;
                            break;
                        case 42 /* '*' */:
                            {
                                try {
                                    /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                    this.readChar();
                                    while (( /* isLetterOrDigit *//[a-zA-Z\d]/.test(this.curChar[0]) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '_'.charCodeAt(0)))) {
                                        {
                                            /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                            this.readChar();
                                        }
                                    }
                                    ;
                                }
                                catch (e1) {
                                    if (!(e1.message === ("End Of Text"))) {
                                        throw new PrologPlusCG.prolog.CompileException("Error in reading a special identifier " + /* toString */ this.token.str + " at line " + this.curLineNumber);
                                    }
                                }
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uIdentSpecial;
                            }
                            ;
                            break;
                        case 40 /* '(' */:
                            {
                                /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uOpenParens;
                                try {
                                    this.readChar();
                                }
                                catch (e1) {
                                    throw new PrologPlusCG.prolog.CompileException("Error in reading the character ( at line " + this.curLineNumber);
                                }
                            }
                            ;
                            break;
                        case 41 /* ')' */:
                            {
                                /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uCloseParens;
                                try {
                                    this.readChar();
                                }
                                catch (e1) {
                                    if (!(e1.message === ("End Of Text"))) {
                                        throw new PrologPlusCG.prolog.CompileException("Error in reading the character ) at line " + this.curLineNumber);
                                    }
                                }
                            }
                            ;
                            break;
                        case 124 /* '|' */:
                            {
                                /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uPipe;
                                try {
                                    this.readChar();
                                }
                                catch (e1) {
                                    throw new PrologPlusCG.prolog.CompileException("Error in reading the character | at line " + this.curLineNumber);
                                }
                            }
                            ;
                            break;
                        case 47 /* '/' */:
                            {
                                /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uIdentifier;
                                try {
                                    this.readChar();
                                }
                                catch (e1) {
                                    throw new PrologPlusCG.prolog.CompileException("Error in reading the character / at line " + this.curLineNumber);
                                }
                            }
                            ;
                            break;
                        case 46 /* '.' */:
                            {
                                /* append */ (function (sb) { sb.str += _this.curChar; return sb; })(this.token);
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uPeriod;
                                try {
                                    this.readChar();
                                }
                                catch (e2) {
                                    if (e2.message === ("End Of Text")) {
                                        var aUnitTyp_1 = new PrologPlusCG.prolog.UnitType(this.token, this.nTokenType);
                                        /* addElement */ (this.vctUnitTyp.push(aUnitTyp_1) > 0);
                                        throw new PrologPlusCG.prolog.CompileException("End Of Text");
                                    }
                                    else {
                                        throw new PrologPlusCG.prolog.CompileException(e2.message);
                                    }
                                }
                            }
                            ;
                            break;
                        case 10 /* '\n' */:
                            throw new PrologPlusCG.prolog.CompileException("End Of Text");
                        default:
                            throw new PrologPlusCG.prolog.CompileException("Illegal Character at line " + this.curLineNumber);
                    }
                }
                var aUnitTyp = new PrologPlusCG.prolog.UnitType(this.token, this.nTokenType);
                /* addElement */ (this.vctUnitTyp.push(aUnitTyp) > 0);
            };
            Compile.prototype.recognizeToken$java_lang_String = function (param_token) {
                var str = this.token.str;
                if (!(str === param_token)) {
                    throw new PrologPlusCG.prolog.CompileException("Error: The string " + param_token + " is expected at line " + this.curLineNumber);
                }
                str = null;
            };
            Compile.prototype.recognizeToken$java_lang_String$byte = function (param_token, param_token_type) {
                if (param_token != null) {
                    var str = this.token.str;
                    if (!(str === param_token)) {
                        throw new PrologPlusCG.prolog.CompileException("Error: The string " + param_token + " is expected at line " + this.curLineNumber);
                    }
                    str = null;
                }
                else if (param_token_type !== this.nTokenType) {
                    throw new PrologPlusCG.prolog.CompileException("Error: A " + param_token_type + " is expected at line " + this.curLineNumber);
                }
            };
            Compile.prototype.recognizeToken = function (param_token, param_token_type) {
                if (((typeof param_token === 'string') || param_token === null) && ((typeof param_token_type === 'number') || param_token_type === null)) {
                    return this.recognizeToken$java_lang_String$byte(param_token, param_token_type);
                }
                else if (((typeof param_token === 'string') || param_token === null) && param_token_type === undefined) {
                    return this.recognizeToken$java_lang_String(param_token);
                }
                else
                    throw new Error('invalid overload');
            };
            /**
             * b) Syntactic analysis
             * @param {boolean} bGenerateCode
             */
            Compile.prototype.doCompile = function (bGenerateCode) {
                if (bGenerateCode) {
                    this.currElem = 0;
                }
                else {
                    this.CompileTxt = this.env.getProgramText();
                    this.textEndIndex = this.CompileTxt.length;
                    if (this.textEndIndex === 0) {
                        throw new PrologPlusCG.prolog.CompileException("Error : Empty prolog program");
                    }
                    this.curLineNumber = 1;
                    this.curCharIndex = 0;
                    this.readChar();
                    /* clear */ (this.vctUnitTyp.length = 0);
                }
                if (bGenerateCode) {
                    this.env.program = ({});
                }
                try {
                    while ((true)) {
                        this.tRule(bGenerateCode);
                    }
                    ;
                }
                catch (e2) {
                    if (!(e2.message === ("End Of Text"))) {
                        throw new PrologPlusCG.prolog.CompileException(e2.message + "\nError in the rule at line " + this.curLineNumber);
                    }
                }
                if (bGenerateCode) {
                    var paqRgles = null;
                    var keys = Object.keys(this.env.program);
                    for (var index = 0; index < keys.length; index++) {
                        var key = keys[index];
                        {
                            paqRgles = /* get */ (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.env.program, key);
                            paqRgles.trimToSize();
                        }
                    }
                }
            };
            Compile.prototype.checkThatRuleOnlyHasAtoms = function () {
                var myRule = this.env.pCurRule;
                if (!myRule.hasOnlyAtoms(this.env)) {
                    throw new PrologPlusCG.prolog.CompileException("Error: rule at line " + this.curLineNumber + " does not consist solely of atoms.\nPerhaps you used a variable name, like \'T\'?\n");
                }
            };
            Compile.prototype.tRule = function (bGenerateCode) {
                if (bGenerateCode && (this.currElem !== /* size */ this.vctUnitTyp.length)) {
                    this.env.pCurRule = new PrologPlusCG.prolog.PrologRule();
                }
                try {
                    this.tGoal(bGenerateCode);
                }
                catch (eBt) {
                    if (!(eBt.message === ("End Of Text"))) {
                        throw new PrologPlusCG.prolog.CompileException(eBt.message + "\n Error in the rule head, at line " + this.curLineNumber);
                    }
                    else {
                        throw new PrologPlusCG.prolog.CompileException("End Of Text");
                    }
                }
                var TypeRegle = 0;
                try {
                    if ((this.nTokenType === PrologPlusCG.prolog.DataTypes.uEntails) || (this.nTokenType === PrologPlusCG.prolog.DataTypes.uGreaterThan) || (this.nTokenType === PrologPlusCG.prolog.DataTypes.uEqualsSign) || (this.nTokenType === PrologPlusCG.prolog.DataTypes.uLeftArrow)) {
                        switch ((this.nTokenType)) {
                            case 23 /* uGreaterThan */:
                                TypeRegle = 1;
                                break;
                            case 18 /* uEqualsSign */:
                                TypeRegle = 2;
                                break;
                            case 21 /* uLeftArrow */:
                                TypeRegle = 3;
                                break;
                        }
                        this.tGoal(bGenerateCode);
                        while ((this.nTokenType === PrologPlusCG.prolog.DataTypes.uComma)) {
                            this.tGoal(bGenerateCode);
                        }
                        ;
                    }
                    this.recognizeToken$java_lang_String(".");
                    if (bGenerateCode) {
                        this.env.pCurRule.trimToSize();
                    }
                }
                catch (e3) {
                    throw new PrologPlusCG.prolog.CompileException(e3.message + "\n Error in the rule tail, at line " + this.curLineNumber);
                }
                var ClePaquet = null;
                if (bGenerateCode && (TypeRegle === 1 || TypeRegle === 2)) {
                    this.checkThatRuleOnlyHasAtoms();
                }
                if (bGenerateCode) {
                    if (TypeRegle === 0) {
                        ClePaquet = this.nameOfArgument(this.env.pCurRule.getAt(0), -1);
                    }
                    else if (TypeRegle === 1) {
                        ClePaquet = this.valSysSP;
                    }
                    else if (TypeRegle === 2) {
                        ClePaquet = this.valSysINST;
                    }
                    else if (TypeRegle === 3) {
                        ClePaquet = this.valSysGEN + this.nameOfArgument(this.env.pCurRule.getAt(0), -1);
                        var aCple = new PrologPlusCG.prolog.PrologTerm();
                        var aDataObjectId = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, this.valSysCleBtCp);
                        aCple.addData(aDataObjectId);
                        aCple.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, this.env.pCurRule.getAt(0)));
                        var aDataObjectVr = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uVariable, this.valSysIdVar);
                        aCple.addData(aDataObjectVr);
                        this.env.pCurRule.set(0, aCple);
                        aCple = new PrologPlusCG.prolog.PrologTerm();
                        aCple.addData(aDataObjectId);
                        aCple.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, this.env.pCurRule.getAt(1)));
                        aCple.addData(aDataObjectVr);
                        this.env.pCurRule.set(1, aCple);
                    }
                    if ( /* containsKey */this.env.program.hasOwnProperty(ClePaquet)) {
                        var regles = (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.env.program, ClePaquet);
                        regles.addRule(this.env.pCurRule);
                        regles = null;
                    }
                    else {
                        var Regles = new PrologPlusCG.prolog.RuleVector();
                        Regles.addRule(this.env.pCurRule);
                        /* put */ (this.env.program[ClePaquet] = Regles);
                        Regles = null;
                    }
                }
                else if (this.curCharIndex === this.textEndIndex) {
                    throw new PrologPlusCG.prolog.CompileException("End Of Text");
                }
                ClePaquet = null;
            };
            Compile.prototype.tGoal = function (bGenerateCode) {
                var but1 = this.tSimpleGoal(bGenerateCode);
                var but2 = null;
                if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uDoubleColon) {
                    but2 = this.tSimpleGoal(bGenerateCode);
                }
                if (bGenerateCode) {
                    if (but2 == null) {
                        this.env.pCurRule.addTerm(but1);
                    }
                    else {
                        var aTerm = new PrologPlusCG.prolog.PrologTerm();
                        var aDataObject = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, this.valSysCleBtCp);
                        aTerm.addData(aDataObject);
                        if ((but1.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (but1.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uCG)) {
                            aTerm.addData(but1.getAt(0));
                        }
                        else {
                            aTerm.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, but1));
                        }
                        if ((but2.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (but2.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uCG)) {
                            aTerm.addData(but2.getAt(0));
                        }
                        else {
                            aTerm.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, but2));
                        }
                        this.env.pCurRule.addTerm(aTerm);
                        aTerm = null;
                        aDataObject = null;
                    }
                }
            };
            Compile.prototype.tSimpleGoal = function (bGenerateCode) {
                var aTerm = null;
                try {
                    var pDon = this.tIdent(bGenerateCode);
                    aTerm = this.tTerm(pDon, bGenerateCode);
                }
                catch (e) {
                    if (e.message === ("End Of Text")) {
                        throw new PrologPlusCG.prolog.CompileException("End Of Text");
                    }
                    else if ( /* startsWith */(function (str, searchString, position) {
                        if (position === void 0) { position = 0; }
                        return str.substr(position, searchString.length) === searchString;
                    })(e.message, "Error: instead of ") && ((this.nTokenType === PrologPlusCG.prolog.DataTypes.uOpenBracket) || (this.nTokenType === PrologPlusCG.prolog.DataTypes.uOpenBrace) || (this.nTokenType === PrologPlusCG.prolog.DataTypes.uVariable))) {
                        var aCG = null;
                        if (bGenerateCode) {
                            aCG = new PrologPlusCG.cg.CG();
                        }
                        try {
                            if ((this.nTokenType === PrologPlusCG.prolog.DataTypes.uOpenBracket) || (this.nTokenType === PrologPlusCG.prolog.DataTypes.uVariable)) {
                                this.tGC(bGenerateCode, aCG);
                            }
                            else {
                                this.tGCPlus(bGenerateCode, aCG);
                            }
                        }
                        catch (ceGC) {
                            if (ceGC.message === ("End Of Text")) {
                                throw new PrologPlusCG.prolog.CompileException("End Of Text");
                            }
                            else {
                                throw new PrologPlusCG.prolog.CompileException("Error in the CG at line " + this.curLineNumber);
                            }
                        }
                        if (bGenerateCode) {
                            aCG.removeSpecialIdent();
                            var pDataCG = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uCG, aCG);
                            aTerm = new PrologPlusCG.prolog.PrologTerm();
                            aTerm.addData(pDataCG);
                            aCG = null;
                        }
                    }
                    else {
                        throw new PrologPlusCG.prolog.CompileException(e.message + "\n Error : A correct goal is expected at line " + this.curLineNumber);
                    }
                }
                return aTerm;
            };
            Compile.prototype.tReferent = function (bGenerateCode) {
                var Ref = null;
                var pTermTmp = null;
                if (bGenerateCode) {
                    pTermTmp = new PrologPlusCG.prolog.PrologTerm();
                }
                var indTmp = this.vctUnitTyp.length;
                this.tPrologData(bGenerateCode, pTermTmp);
                if (bGenerateCode) {
                    Ref = pTermTmp.getAt(0);
                    pTermTmp.clear();
                    pTermTmp = null;
                    if (Ref.typeOfData === PrologPlusCG.prolog.DataTypes.uString) {
                        Ref.typeOfData = PrologPlusCG.prolog.DataTypes.uIdentifier;
                    }
                }
                else {
                    var typeUnite = this.vctUnitTyp[indTmp].typUnit;
                    if ((typeUnite !== PrologPlusCG.prolog.DataTypes.uString) && (typeUnite !== PrologPlusCG.prolog.DataTypes.uIdentifier) && (typeUnite !== PrologPlusCG.prolog.DataTypes.uVariable) && (typeUnite !== PrologPlusCG.prolog.DataTypes.uIdentSpecial) && (typeUnite !== PrologPlusCG.prolog.DataTypes.uOpenBrace)) {
                        throw new PrologPlusCG.prolog.CompileException("Error: a referent is expected at line " + this.curLineNumber);
                    }
                }
                return Ref;
            };
            Compile.prototype.tIdent = function (bGenerateCode) {
                this.readToken(bGenerateCode);
                if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uString) {
                    this.nTokenType = PrologPlusCG.prolog.DataTypes.uIdentifier;
                }
                if ((this.nTokenType !== PrologPlusCG.prolog.DataTypes.uIdentifier) && ((this.nTokenType !== PrologPlusCG.prolog.DataTypes.uVariable) || this.test1CarCour(bGenerateCode))) {
                    throw new PrologPlusCG.prolog.CompileException("Error: instead of " + /* toString */ this.token.str + ", a (term) identifier is expected at line " + this.curLineNumber);
                }
                var pDon = null;
                if (bGenerateCode) {
                    pDon = new PrologPlusCG.prolog.PrologData();
                    pDon.typeOfData = this.nTokenType;
                    pDon.data = this.token.str;
                }
                return pDon;
            };
            Compile.prototype.tTerm = function (pIdent, bGenerateCode) {
                var pTerme = null;
                if (bGenerateCode) {
                    pTerme = new PrologPlusCG.prolog.PrologTerm();
                    pTerme.addData(pIdent);
                }
                try {
                    this.readToken(bGenerateCode);
                    if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uOpenParens) {
                        this.tPrologData(bGenerateCode, pTerme);
                        while ((this.nTokenType === PrologPlusCG.prolog.DataTypes.uComma)) {
                            this.tPrologData(bGenerateCode, pTerme);
                        }
                        ;
                        this.recognizeToken$java_lang_String(")");
                        try {
                            this.readToken(bGenerateCode);
                        }
                        catch (e1) {
                            if (!(e1.message === ("End Of Text"))) {
                                throw new PrologPlusCG.prolog.CompileException(e1.message);
                            }
                        }
                    }
                }
                catch (e) {
                    if (!(e.message === ("End Of Text"))) {
                        throw new PrologPlusCG.prolog.CompileException(e.message + "\n Error in the argument list of a term at line " + this.curLineNumber);
                    }
                }
                if (bGenerateCode) {
                    pTerme.trimToSize();
                }
                return pTerme;
            };
            Compile.prototype.tConcept = function (bGenerateCode, unGC) {
                var Type = null;
                var Ref = null;
                var Val = null;
                if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uVariable) {
                    if (bGenerateCode) {
                        Ref = new PrologPlusCG.prolog.PrologData();
                        Ref.typeOfData = this.nTokenType;
                        Ref.data = this.token.str;
                    }
                }
                else {
                    try {
                        Type = this.tIdent(bGenerateCode);
                        this.readToken(bGenerateCode);
                        if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uColon) {
                            Ref = this.tReferent(bGenerateCode);
                        }
                        if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uEqualsSign) {
                            var pTermTmp = null;
                            if (bGenerateCode) {
                                pTermTmp = new PrologPlusCG.prolog.PrologTerm();
                            }
                            this.tPrologData(bGenerateCode, pTermTmp);
                            if (bGenerateCode) {
                                Val = pTermTmp.getAt(0);
                                pTermTmp.clear();
                                pTermTmp = null;
                            }
                        }
                        this.recognizeToken$java_lang_String$byte(null, PrologPlusCG.prolog.DataTypes.uCloseBracket);
                    }
                    catch (ce) {
                        throw new PrologPlusCG.prolog.CompileException("Error in the concept at line " + this.curLineNumber);
                    }
                }
                var conc = null;
                if (bGenerateCode) {
                    var trouve = false;
                    for (var listIndex2 = 0; listIndex2 < /* size */ unGC.m_vctConcepts.length && !trouve; ++listIndex2) {
                        {
                            conc = /* get */ unGC.m_vctConcepts[listIndex2];
                            if ((conc.m_pdReferent != null) && (Ref != null) && (typeof conc.m_pdReferent.data === 'string') && (typeof Ref.data === 'string') && (Ref.valString() === conc.m_pdReferent.valString())) {
                                trouve = true;
                            }
                            else if ((conc.m_pdReferent != null) && (Ref != null) && (conc.m_pdReferent.typeOfData === Ref.typeOfData) && (conc.m_pdReferent.typeOfData === PrologPlusCG.prolog.DataTypes.uSet) && this.setsAreEqual(conc.m_pdReferent.data, Ref.data)) {
                                trouve = true;
                            }
                        }
                        ;
                    }
                    if (!trouve) {
                        conc = new PrologPlusCG.cg.Concept(Type, Ref, Val, this.env);
                        unGC.addConcept(conc);
                    }
                }
                return conc;
            };
            Compile.prototype.tGCPlus = function (bGenerateCode, unGC) {
                var encore = true;
                while ((encore)) {
                    {
                        this.readToken(bGenerateCode);
                        if ((this.nTokenType !== PrologPlusCG.prolog.DataTypes.uOpenBracket) && (this.nTokenType !== PrologPlusCG.prolog.DataTypes.uVariable)) {
                            throw new PrologPlusCG.prolog.CompileException("Error: A CG is expected at line " + this.curLineNumber);
                        }
                        this.tGC(bGenerateCode, unGC);
                        if (this.nTokenType !== PrologPlusCG.prolog.DataTypes.uAmpersAnd) {
                            encore = false;
                        }
                    }
                }
                ;
                this.recognizeToken$java_lang_String$byte(null, PrologPlusCG.prolog.DataTypes.uCloseBrace);
                this.readToken(bGenerateCode);
            };
            Compile.prototype.tGC = function (bGenerateCode, unGC) {
                var conc = this.tConcept(bGenerateCode, unGC);
                try {
                    this.readToken(bGenerateCode);
                }
                catch (ceGC) {
                    if (!(ceGC.message === ("End Of Text"))) {
                        throw new PrologPlusCG.prolog.CompileException("Error in the CG at line " + this.curLineNumber);
                    }
                }
                if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uLeftArrow) {
                    this.tRelEntr(bGenerateCode, unGC, conc);
                }
                else if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uMinus) {
                    this.tRelSortOuRels(bGenerateCode, unGC, conc);
                }
                return conc;
            };
            Compile.prototype.tRelSort = function (bGenerateCode, unGC, concSrce) {
                var idRel = this.token.str;
                var typIdRel = this.nTokenType;
                this.readToken(bGenerateCode);
                this.recognizeToken$java_lang_String$byte(null, PrologPlusCG.prolog.DataTypes.uRightArrow);
                this.readToken(bGenerateCode);
                if ((this.nTokenType !== PrologPlusCG.prolog.DataTypes.uOpenBracket) && (this.nTokenType !== PrologPlusCG.prolog.DataTypes.uVariable)) {
                    throw new PrologPlusCG.prolog.CompileException("Error: A CG is expected at line " + this.curLineNumber);
                }
                var concCble = this.tGC(bGenerateCode, unGC);
                if (bGenerateCode) {
                    var nouvRel = new PrologPlusCG.cg.Relation(new PrologPlusCG.prolog.PrologData(typIdRel, idRel), concSrce, concCble);
                    unGC.addRelation(nouvRel);
                }
            };
            Compile.prototype.tRelEntr = function (bGenerateCode, unGC, concCble) {
                this.readToken(bGenerateCode);
                var idRel = this.token.str;
                var typIdRel = this.nTokenType;
                this.readToken(bGenerateCode);
                this.recognizeToken$java_lang_String$byte(null, PrologPlusCG.prolog.DataTypes.uMinus);
                this.readToken(bGenerateCode);
                if ((this.nTokenType !== PrologPlusCG.prolog.DataTypes.uOpenBracket) && (this.nTokenType !== PrologPlusCG.prolog.DataTypes.uVariable)) {
                    throw new PrologPlusCG.prolog.CompileException("Error: A CG is expected at line " + this.curLineNumber);
                }
                var concSrce = this.tGC(bGenerateCode, unGC);
                if (bGenerateCode) {
                    var nouvRel = new PrologPlusCG.cg.Relation(new PrologPlusCG.prolog.PrologData(typIdRel, idRel), concSrce, concCble);
                    unGC.addRelation(nouvRel);
                }
            };
            Compile.prototype.tRelSortOuRels = function (bGenerateCode, unGC, conc) {
                this.readToken(bGenerateCode);
                if ((this.nTokenType === PrologPlusCG.prolog.DataTypes.uIdentifier) || (this.nTokenType === PrologPlusCG.prolog.DataTypes.uVariable)) {
                    this.tRelSort(bGenerateCode, unGC, conc);
                }
                else {
                    this.tRels(bGenerateCode, unGC, conc);
                }
            };
            Compile.prototype.tRels = function (bGenerateCode, unGC, conc) {
                if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uMinus) {
                    this.readToken(bGenerateCode);
                    if ((this.nTokenType !== PrologPlusCG.prolog.DataTypes.uIdentifier) && (this.nTokenType !== PrologPlusCG.prolog.DataTypes.uVariable)) {
                        throw new PrologPlusCG.prolog.CompileException("Error: an identifier of a constant or of a variable is expected.");
                    }
                    this.tRelSort(bGenerateCode, unGC, conc);
                }
                else {
                    this.recognizeToken$java_lang_String$byte(null, PrologPlusCG.prolog.DataTypes.uLeftArrow);
                    this.tRelEntr(bGenerateCode, unGC, conc);
                }
                if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uComma) {
                    if (this.test1CarCour(bGenerateCode)) {
                        this.readToken(bGenerateCode);
                        this.tRels(bGenerateCode, unGC, conc);
                    }
                }
                if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uSemicolon) {
                    this.readToken(bGenerateCode);
                }
            };
            Compile.prototype.tSentence = function () {
                try {
                    while ((true)) {
                        this.readToken(false);
                    }
                    ;
                }
                catch (e) {
                    if (!(e.message === ("End Of Text"))) {
                        throw new PrologPlusCG.prolog.CompileException("Error while reading a sentence at line " + this.curLineNumber);
                    }
                }
            };
            Compile.prototype.tPrologData = function (bGenerateCode, pLstPrlg2) {
                var pData = null;
                if (bGenerateCode) {
                    pData = new PrologPlusCG.prolog.PrologData();
                }
                var uniteDejaLue = false;
                this.readToken(bGenerateCode);
                if (bGenerateCode) {
                    pData.typeOfData = this.nTokenType;
                }
                switch ((this.nTokenType)) {
                    case 0 /* uNumber */:
                        if (bGenerateCode) {
                            var stUnite = this.token.str;
                            if (stUnite.indexOf(".") >= 0) {
                                pData.data = new Number(stUnite).valueOf();
                            }
                            else {
                                try {
                                    pData.data = new Number(stUnite).valueOf();
                                }
                                catch (e) {
                                    throw new PrologPlusCG.prolog.CompileException(e.message + "\n Error in reading the number.\nProbably it was too large or too small (negative).");
                                }
                            }
                        }
                        break;
                    case 1 /* uBoolean */:
                        if (bGenerateCode) {
                            var s = this.token.str;
                            var b = s === ("true");
                            if (b) {
                                pData.data = true;
                            }
                            else {
                                pData.data = false;
                            }
                        }
                        break;
                    case 2 /* uIdentifier */:
                        {
                            if (bGenerateCode) {
                                pData.data = this.token.str;
                            }
                            var pTerme = this.tTerm(pData, bGenerateCode);
                            if (bGenerateCode) {
                                if (pTerme.size() > 1) {
                                    pTerme.trimToSize();
                                    pData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, pTerme);
                                }
                                else {
                                    pTerme.clear();
                                }
                            }
                            pTerme = null;
                            uniteDejaLue = true;
                        }
                        ;
                        break;
                    case 28 /* uIdentSpecial */:
                    case 3 /* uString */:
                        if (bGenerateCode) {
                            pData.data = this.token.str;
                        }
                        break;
                    case 4 /* uVariable */:
                        {
                            if (this.test1CarCour(bGenerateCode)) {
                                var unGC = null;
                                if (bGenerateCode) {
                                    unGC = new PrologPlusCG.cg.CG();
                                }
                                this.tGC(bGenerateCode, unGC);
                                if (bGenerateCode) {
                                    unGC.removeSpecialIdent();
                                    pData.typeOfData = PrologPlusCG.prolog.DataTypes.uCG;
                                    pData.data = unGC;
                                }
                                uniteDejaLue = true;
                                unGC = null;
                            }
                            else if (bGenerateCode) {
                                pData.data = this.token.str;
                            }
                        }
                        ;
                        break;
                    case 7 /* uOpenParens */:
                        {
                            var pLstPrlg = null;
                            if (bGenerateCode) {
                                pLstPrlg = new PrologPlusCG.prolog.PrologList();
                            }
                            var bListIsEmpty = false;
                            try {
                                this.tPrologData(bGenerateCode, pLstPrlg);
                            }
                            catch (e1) {
                                if ((e1.message === ("Error: Unrecognized data")) && (this.nTokenType === PrologPlusCG.prolog.DataTypes.uCloseParens)) {
                                    bListIsEmpty = true;
                                }
                                else {
                                    throw new PrologPlusCG.prolog.CompileException(e1.message + "\n Error in reading data");
                                }
                            }
                            if (!bListIsEmpty) {
                                while ((this.nTokenType === PrologPlusCG.prolog.DataTypes.uComma)) {
                                    this.tPrologData(bGenerateCode, pLstPrlg);
                                }
                                ;
                                if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uPipe) {
                                    this.tPrologData(bGenerateCode, pLstPrlg);
                                    if (!bGenerateCode && (this.vctUnitTyp[ /* size */this.vctUnitTyp.length - 2].typUnit !== PrologPlusCG.prolog.DataTypes.uVariable)) {
                                        throw new PrologPlusCG.prolog.CompileException("A variable is expected after | at line " + this.curLineNumber);
                                    }
                                    if (bGenerateCode) {
                                        pLstPrlg.lastElement().typeOfData = PrologPlusCG.prolog.DataTypes.uVarList;
                                    }
                                }
                                this.recognizeToken$java_lang_String(")");
                            }
                            if (bGenerateCode) {
                                pData.typeOfData = PrologPlusCG.prolog.DataTypes.uList;
                                pLstPrlg.trimToSize();
                                pData.data = pLstPrlg;
                            }
                            pLstPrlg = null;
                        }
                        ;
                        break;
                    case 25 /* uOpenBrace */:
                        {
                            var pLstPrlg = null;
                            if (bGenerateCode) {
                                pLstPrlg = new PrologPlusCG.prolog.PrologList();
                            }
                            var bSetIsEmpty = false;
                            var indTmp = this.vctUnitTyp.length;
                            try {
                                this.tPrologData(bGenerateCode, pLstPrlg);
                                if (!bGenerateCode) {
                                    var typeUnite = this.vctUnitTyp[indTmp].typUnit;
                                    if ((typeUnite !== PrologPlusCG.prolog.DataTypes.uString) && (typeUnite !== PrologPlusCG.prolog.DataTypes.uIdentifier)) {
                                        throw new PrologPlusCG.prolog.CompileException("Error: a set of referents is expected at line " + this.curLineNumber);
                                    }
                                }
                            }
                            catch (e1) {
                                if ((e1.message === ("Error: Unrecognized data")) && (this.nTokenType === PrologPlusCG.prolog.DataTypes.uCloseBrace)) {
                                    bSetIsEmpty = true;
                                }
                                else {
                                    throw new PrologPlusCG.prolog.CompileException(e1.message + "\n Error in reading data");
                                }
                            }
                            if (!bSetIsEmpty) {
                                while ((this.nTokenType === PrologPlusCG.prolog.DataTypes.uComma)) {
                                    {
                                        indTmp = /* size */ this.vctUnitTyp.length;
                                        this.tPrologData(bGenerateCode, pLstPrlg);
                                        if (!bGenerateCode) {
                                            var typeUnite = this.vctUnitTyp[indTmp].typUnit;
                                            if ((typeUnite !== PrologPlusCG.prolog.DataTypes.uString) && (typeUnite !== PrologPlusCG.prolog.DataTypes.uIdentifier)) {
                                                throw new PrologPlusCG.prolog.CompileException("Error: a set of referents is expected at line " + this.curLineNumber);
                                            }
                                        }
                                    }
                                }
                                ;
                                this.recognizeToken$java_lang_String("}");
                            }
                            if (bGenerateCode) {
                                pData.typeOfData = PrologPlusCG.prolog.DataTypes.uSet;
                                pLstPrlg.trimToSize();
                                pData.data = pLstPrlg;
                            }
                            pLstPrlg = null;
                        }
                        ;
                        break;
                    case 15 /* uOpenBracket */:
                        {
                            var unGC = null;
                            if (bGenerateCode) {
                                unGC = new PrologPlusCG.cg.CG();
                            }
                            this.tGC(bGenerateCode, unGC);
                            if (bGenerateCode) {
                                unGC.removeSpecialIdent();
                                pData.typeOfData = PrologPlusCG.prolog.DataTypes.uCG;
                                pData.data = unGC;
                            }
                            uniteDejaLue = true;
                            unGC = null;
                        }
                        ;
                        break;
                    default:
                        throw new PrologPlusCG.prolog.CompileException("Error: Unrecognized data");
                }
                if (bGenerateCode) {
                    pLstPrlg2.addElement(pData);
                }
                if (!uniteDejaLue) {
                    this.readToken(bGenerateCode);
                }
            };
            /*private*/ Compile.prototype.test1CarCour = function (bGenerateCode) {
                var b = false;
                if (bGenerateCode) {
                    var typeUnit = this.vctUnitTyp[this.currElem].typUnit;
                    if ((typeUnit === PrologPlusCG.prolog.DataTypes.uMinus) || (typeUnit === PrologPlusCG.prolog.DataTypes.uLeftArrow)) {
                        b = true;
                    }
                }
                else {
                    while ((Compile.isSpaceChar(this.curChar) || ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '\t'.charCodeAt(0)))) {
                        this.readChar();
                    }
                    ;
                    if ((((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '-'.charCodeAt(0)) && !/\d/.test(this.nextChar()[0])) || (((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.curChar) == '<'.charCodeAt(0)) && ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this.nextChar()) == '-'.charCodeAt(0)))) {
                        b = true;
                    }
                }
                return b;
            };
            Compile.prototype.hasString = function (Ref, myset) {
                var tmpData = null;
                var st = null;
                var bFound = false;
                for (var listIndex = 0; listIndex < myset.size() && !bFound; ++listIndex) {
                    {
                        tmpData = myset.get(listIndex);
                        st = tmpData.data;
                        if (st === Ref) {
                            bFound = true;
                        }
                    }
                    ;
                }
                return bFound;
            };
            Compile.prototype.intersection = function (set1, set2) {
                var resultSet = new PrologPlusCG.prolog.PrologList();
                var tmpData = null;
                for (var listIndex = 0; listIndex < set1.size(); ++listIndex) {
                    {
                        tmpData = set1.get(listIndex);
                        if (this.hasString(tmpData.data, set2)) {
                            resultSet.addData(tmpData);
                        }
                    }
                    ;
                }
                return resultSet;
            };
            Compile.prototype.union = function (s1, set2) {
                var resultSet = set2.myCopy();
                if (s1 != null && s1 instanceof PrologPlusCG.prolog.PrologData) {
                    var DonTmp = s1;
                    if (!this.hasString(DonTmp.data, set2)) {
                        resultSet.addData(DonTmp);
                    }
                }
                else {
                    var set1 = s1;
                    var tempData = null;
                    for (var listIndex = 0; listIndex < set1.size(); ++listIndex) {
                        {
                            tempData = set1.get(listIndex);
                            if (!this.hasString(tempData.data, set2)) {
                                resultSet.addData(tempData);
                            }
                        }
                        ;
                    }
                }
                return resultSet;
            };
            Compile.prototype.set1IsSubsetOfSet2 = function (ens1, ens2) {
                return this.compareSets(ens1, ens2, false);
            };
            Compile.prototype.compareSets = function (set1, set2, testEquality) {
                var bSetsAreEqual = true;
                var vctCopyOfElementsInSet2 = ([]);
                var tmpData = null;
                for (var listIndex = 0; listIndex < set2.size(); ++listIndex) {
                    {
                        tmpData = set2.get(listIndex);
                        /* addElement */ (vctCopyOfElementsInSet2.push(tmpData.data) > 0);
                    }
                    ;
                }
                var st1;
                var st2 = null;
                var i = 0;
                var bFound = false;
                for (var listIndex = 0; listIndex < set1.size() && bSetsAreEqual; ++listIndex) {
                    {
                        tmpData = set1.get(listIndex);
                        st1 = tmpData.data;
                        i = 0;
                        bFound = false;
                        for (var listIndex3 = 0; listIndex3 < /* size */ vctCopyOfElementsInSet2.length && !bFound; ++listIndex3) {
                            {
                                st2 = vctCopyOfElementsInSet2[listIndex3];
                                if (st1 === st2) {
                                    bFound = true;
                                }
                                else {
                                    i++;
                                }
                            }
                            ;
                        }
                        if (bFound) {
                            /* removeElementAt */ vctCopyOfElementsInSet2.splice(i, 1);
                        }
                        else {
                            bSetsAreEqual = false;
                        }
                    }
                    ;
                }
                if (testEquality) {
                    bSetsAreEqual = bSetsAreEqual && /* isEmpty */ (vctCopyOfElementsInSet2.length == 0);
                    if (set1.isEmpty() || set2.isEmpty()) {
                        bSetsAreEqual = (set1.isEmpty() && set2.isEmpty());
                    }
                }
                else if (set1.isEmpty() || set2.isEmpty()) {
                    bSetsAreEqual = set1.isEmpty();
                }
                /* clear */ (vctCopyOfElementsInSet2.length = 0);
                return bSetsAreEqual;
            };
            Compile.prototype.setsAreEqual = function (ens1, ens2) {
                return this.compareSets(ens1, ens2, true);
            };
            Compile.prototype.compileTerm = function (strTerm) {
                this.CompileTxt = strTerm;
                this.textEndIndex = this.CompileTxt.length;
                this.curCharIndex = 0;
                var saveCurLineNumber = this.curLineNumber;
                this.readChar();
                /* clear */ (this.vctUnitTyp.length = 0);
                this.tGoal(false);
                this.curLineNumber = saveCurLineNumber;
                this.currElem = 0;
                this.env.pCurRule = new PrologPlusCG.prolog.PrologRule();
                this.tGoal(true);
                /* clear */ (this.vctUnitTyp.length = 0);
                var trm = this.env.pCurRule.getAt(0);
                this.env.pCurRule.clear();
                this.env.pCurRule = null;
                return trm;
            };
            Compile.prototype.compileAlternatePrintString = function (strData) {
                var unTermTmp = this.compileTerm(strData);
                return this.distillVectorToAlternatePrintStringVector(unTermTmp);
            };
            Compile.prototype.distillVectorToAlternatePrintStringVector = function (v) {
                var vctDistilled = ([]);
                var aDataObject = null;
                for (var listIndex = 0; listIndex < v.size(); ++listIndex) {
                    {
                        aDataObject = v.get(listIndex);
                        if ((aDataObject.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm) || (aDataObject.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm)) {
                            var data = aDataObject.data;
                            /* addElement */ (vctDistilled.push(/* toString */ ('[' + this.distillVectorToAlternatePrintStringVector(data).join(', ') + ']')) > 0);
                        }
                        else {
                            /* addElement */ (vctDistilled.push(aDataObject.data.toString()) > 0);
                        }
                    }
                    ;
                }
                return vctDistilled;
            };
            Compile.prototype.compileQuery = function (request) {
                this.CompileTxt = request;
                this.textEndIndex = this.CompileTxt.length;
                this.curCharIndex = 0;
                var sauvNumLigneCour = this.curLineNumber;
                this.readChar();
                /* clear */ (this.vctUnitTyp.length = 0);
                try {
                    this.tGoal(false);
                }
                catch (exc1) {
                    if ((exc1.message === ("End Of Text")) && /* isEmpty */ (this.vctUnitTyp.length == 0)) {
                        throw new PrologPlusCG.prolog.CompileException("null request");
                    }
                    else if (exc1.message === ("End Of Text")) {
                        this.recognizeToken$java_lang_String(".");
                    }
                    else {
                        throw new PrologPlusCG.prolog.CompileException(exc1.message + "\n Error in the request.");
                    }
                }
                try {
                    while ((this.nTokenType === PrologPlusCG.prolog.DataTypes.uComma)) {
                        this.tGoal(false);
                    }
                    ;
                    this.recognizeToken$java_lang_String(".");
                }
                catch (e) {
                    if ((e.message === ("End Of Text")) && /* isEmpty */ (this.vctUnitTyp.length == 0)) {
                        throw new PrologPlusCG.prolog.CompileException("null request");
                    }
                    else if (e.message === ("End Of Text")) {
                        this.recognizeToken$java_lang_String(".");
                    }
                    else {
                        throw new PrologPlusCG.prolog.CompileException(e.message + "\n Error in the request.");
                    }
                }
                this.curLineNumber = sauvNumLigneCour;
                this.currElem = 0;
                this.env.pCurRule = new PrologPlusCG.prolog.PrologRule();
                this.tGoal(true);
                while ((this.nTokenType === PrologPlusCG.prolog.DataTypes.uComma)) {
                    this.tGoal(true);
                }
                ;
                this.recognizeToken$java_lang_String(".");
                this.env.pCurRule.trimToSize();
                this.determineQueryVariables();
                /* clear */ (this.vctUnitTyp.length = 0);
            };
            Compile.prototype.determineQueryVariables = function () {
                /* clear */ (this.vctVariableIdentifiersInQuery.length = 0);
                var unitTyp;
                for (var listIndex1 = 0; listIndex1 < /* size */ this.vctUnitTyp.length; ++listIndex1) {
                    {
                        unitTyp = /* get */ this.vctUnitTyp[listIndex1];
                        if ((unitTyp.typUnit === PrologPlusCG.prolog.DataTypes.uVariable) || (unitTyp.typUnit === PrologPlusCG.prolog.DataTypes.uVarList)) {
                            var bFound = false;
                            var idVar = void 0;
                            for (var listIndex2 = 0; listIndex2 < /* size */ this.vctVariableIdentifiersInQuery.length && !bFound; ++listIndex2) {
                                {
                                    idVar = /* get */ this.vctVariableIdentifiersInQuery[listIndex2];
                                    if (idVar === /* toString */ unitTyp.unit.str) {
                                        bFound = true;
                                    }
                                }
                                ;
                            }
                            if (!bFound) {
                                /* addElement */ (this.vctVariableIdentifiersInQuery.push(/* toString */ unitTyp.unit.str) > 0);
                            }
                        }
                    }
                    ;
                }
            };
            Compile.prototype.nameOfArgument = function (UnTerme, niv) {
                var strResult = null;
                var aDataObject = UnTerme.getAt(0);
                if (aDataObject.typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) {
                }
                else if (aDataObject.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) {
                    strResult = this.valSysCleCG;
                }
                else if (aDataObject.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) {
                    var idTerme = UnTerme.getAt(0).data;
                    if (idTerme === this.valSysCleBtCp) {
                        var Arg1 = UnTerme.getAt(1);
                        if (Arg1.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) {
                            strResult = this.valSysCleBtCp;
                        }
                        else if (Arg1.typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) {
                            if (niv >= 0) {
                                var contr = this.env.unification.valueFromUnifStack(Arg1, niv);
                                if (contr.pData != null) {
                                    if (contr.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) {
                                        strResult = this.valSysCleBtCp;
                                    }
                                    else if (contr.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm) {
                                        var Cple1Term = contr.pData.data;
                                        var st = this.getTermSlashNumberOfArgumentsString(Cple1Term.getAt(0).data, Cple1Term.size() - 1);
                                        strResult = this.valSysCleBtCp + st;
                                    }
                                }
                                else {
                                    throw new PrologPlusCG.prolog.CompileException("Error : The goal head is a free variable at " + this.curLineNumber);
                                }
                            }
                        }
                        else if (Arg1.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm) {
                            var Cple1Term = Arg1.data;
                            var st = this.getTermSlashNumberOfArgumentsString(Cple1Term.getAt(0).data, Cple1Term.size() - 1);
                            strResult = this.valSysCleBtCp + st;
                        }
                    }
                    else {
                        strResult = this.getTermSlashNumberOfArgumentsString(idTerme, UnTerme.size() - 1);
                    }
                }
                return strResult;
            };
            Compile.prototype.getTermSlashNumberOfArgumentsString = function (Ident, number) {
                var strNumber;
                strNumber = /* toString */ ('' + (number));
                return (Ident + "/" + strNumber);
            };
            return Compile;
        }());
        prolog.Compile = Compile;
        Compile["__class"] = "PrologPlusCG.prolog.Compile";
        Compile["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var CompileException = /** @class */ (function (_super) {
            __extends(CompileException, _super);
            function CompileException(s) {
                var _this = _super.call(this, s) || this;
                _this.message = s;
                Object.setPrototypeOf(_this, CompileException.prototype);
                return _this;
            }
            CompileException.serialVersionUID = 3257568425244309042;
            return CompileException;
        }(Error));
        prolog.CompileException = CompileException;
        CompileException["__class"] = "PrologPlusCG.prolog.CompileException";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var ConceptUnification = /** @class */ (function () {
            function ConceptUnification(C1, C2, B) {
                if (this.m_ConcMatched1 === undefined) {
                    this.m_ConcMatched1 = null;
                }
                if (this.m_ConcMatched2 === undefined) {
                    this.m_ConcMatched2 = null;
                }
                if (this.m_MatchedLocally === undefined) {
                    this.m_MatchedLocally = false;
                }
                this.m_ConcMatched1 = C1;
                this.m_ConcMatched2 = C2;
                this.m_MatchedLocally = B;
            }
            ConceptUnification.prototype.myDestroy = function () {
                this.m_ConcMatched1 = null;
                this.m_ConcMatched2 = null;
            };
            return ConceptUnification;
        }());
        prolog.ConceptUnification = ConceptUnification;
        ConceptUnification["__class"] = "PrologPlusCG.prolog.ConceptUnification";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        /**
         * unifier(TeteRegle, _, ButCourant, _, _) :
         * si un arg du term tete est une valeur Vl et l'arg correspondant est une variable Vr
         * alors il faut ajouter dans le RecUnif courant une entree pour variable "" avec la
         * valeur Vl comme ValInd et propager la reference a ValInd pour la variable Vr
         * @class
         */
        var Constraint = /** @class */ (function () {
            function Constraint(pLeftData, plevelOfLeftData, pRightData, plevelOfRightData) {
                if (this.m_LeftData === undefined) {
                    this.m_LeftData = null;
                }
                if (this.m_levelOfLeftData === undefined) {
                    this.m_levelOfLeftData = 0;
                }
                if (this.m_RightData === undefined) {
                    this.m_RightData = null;
                }
                if (this.m_levelOfRightData === undefined) {
                    this.m_levelOfRightData = 0;
                }
                this.m_LeftData = pLeftData;
                this.m_levelOfLeftData = plevelOfLeftData;
                this.m_RightData = pRightData;
                this.m_levelOfRightData = plevelOfRightData;
            }
            Constraint.prototype.myDestroy = function () {
                this.m_LeftData = null;
                this.m_RightData = null;
            };
            return Constraint;
        }());
        prolog.Constraint = Constraint;
        Constraint["__class"] = "PrologPlusCG.prolog.Constraint";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var DataTypeVectorPair = /** @class */ (function () {
            function DataTypeVectorPair(vSons, vFathers) {
                if (((vSons != null && (vSons instanceof Array)) || vSons === null) && ((vFathers != null && (vFathers instanceof Array)) || vFathers === null)) {
                    var __args = arguments;
                    if (this.vctSons === undefined) {
                        this.vctSons = null;
                    }
                    if (this.vectFathers === undefined) {
                        this.vectFathers = null;
                    }
                    this.vctSons = vSons;
                    this.vectFathers = vFathers;
                }
                else if (vSons === undefined && vFathers === undefined) {
                    var __args = arguments;
                    if (this.vctSons === undefined) {
                        this.vctSons = null;
                    }
                    if (this.vectFathers === undefined) {
                        this.vectFathers = null;
                    }
                    this.vctSons = ([]);
                    this.vectFathers = ([]);
                }
                else
                    throw new Error('invalid overload');
            }
            return DataTypeVectorPair;
        }());
        prolog.DataTypeVectorPair = DataTypeVectorPair;
        DataTypeVectorPair["__class"] = "PrologPlusCG.prolog.DataTypeVectorPair";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var DataTypes;
        (function (DataTypes) {
            /**
             * Set of lexical token types: Possible values of nTokenType
             */
            DataTypes.uNumber = 0;
            DataTypes.uBoolean = 1;
            DataTypes.uIdentifier = 2;
            DataTypes.uString = 3;
            DataTypes.uVariable = 4;
            DataTypes.uConcept = 37;
            DataTypes.uObject = 43;
            DataTypes.uSet = 44;
            DataTypes.uEntails = 5;
            DataTypes.uComma = 6;
            DataTypes.uOpenParens = 7;
            DataTypes.uCloseParens = 8;
            DataTypes.uPipe = 9;
            DataTypes.uPeriod = 10;
            DataTypes.uTerm = 11;
            DataTypes.uVarList = 12;
            DataTypes.uList = 13;
            DataTypes.uCG = 14;
            DataTypes.uOpenBracket = 15;
            DataTypes.uCloseBracket = 16;
            DataTypes.uColon = 17;
            DataTypes.uEqualsSign = 18;
            DataTypes.uMinus = 19;
            DataTypes.uRightArrow = 20;
            DataTypes.uLeftArrow = 21;
            DataTypes.uSemicolon = 22;
            DataTypes.uExclamationMark = 38;
            DataTypes.uQuestionMark = 39;
            DataTypes.uGreaterThan = 23;
            DataTypes.uDoubleColon = 24;
            DataTypes.uOpenBrace = 25;
            DataTypes.uCloseBrace = 26;
            DataTypes.uAmpersAnd = 27;
            DataTypes.uIdentSpecial = 28;
            DataTypes.e_match = 29;
            DataTypes.e_project = 30;
            DataTypes.e_maximalJoin = 31;
            DataTypes.e_generalize = 32;
            DataTypes.e_subsume = 33;
            DataTypes.e_subsumeWithoutResult = 34;
            DataTypes.e_completeContract = 35;
            DataTypes.e_partialContract = 36;
            DataTypes.uReadData = 41;
            DataTypes.uReadSentence = 42;
        })(DataTypes = prolog.DataTypes || (prolog.DataTypes = {}));
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var ExecException = /** @class */ (function (_super) {
            __extends(ExecException, _super);
            function ExecException(s) {
                var _this = _super.call(this, s) || this;
                _this.message = s;
                Object.setPrototypeOf(_this, ExecException.prototype);
                return _this;
            }
            ExecException.serialVersionUID = 3257566221942798640;
            return ExecException;
        }(Error));
        prolog.ExecException = ExecException;
        ExecException["__class"] = "PrologPlusCG.prolog.ExecException";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var IdentifierIndexPair = /** @class */ (function () {
            function IdentifierIndexPair(id, i) {
                if (this.idType === undefined) {
                    this.idType = null;
                }
                if (this.index === undefined) {
                    this.index = 0;
                }
                this.idType = id;
                this.index = i;
            }
            return IdentifierIndexPair;
        }());
        prolog.IdentifierIndexPair = IdentifierIndexPair;
        IdentifierIndexPair["__class"] = "PrologPlusCG.prolog.IdentifierIndexPair";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var PPCGEnv = /** @class */ (function () {
            function PPCGEnv() {
                if (this.strErrorMessage === undefined) {
                    this.strErrorMessage = null;
                }
                this.program = null;
                this.typeHierarchy = null;
                this.pCurRule = null;
                this.ProgramText = "";
                this.vctResult = null;
                this.bConvResultToString = true;
                if (this.aResolution === undefined) {
                    this.aResolution = null;
                }
                this.bInReadingMode = false;
                if (this.io === undefined) {
                    this.io = null;
                }
                this.bWriteToDebugTree = false;
                this.bWriteToToolTip = false;
                this.bIsApplet = true;
                this.bStopExec = false;
                this.printer = null;
                this.compile = null;
                this.unification = null;
                this.unifyCG = null;
                this.printer = new PrologPlusCG.prolog.Printer(this);
                this.compile = new PrologPlusCG.prolog.Compile(this);
                this.unification = new PrologPlusCG.prolog.Unification(this);
                this.unifyCG = new PrologPlusCG.prolog.UnifyCG(this);
            }
            PPCGEnv.prototype.recordErrorMessage = function (strMessage) {
                this.strErrorMessage += strMessage;
            };
            PPCGEnv.prototype.getAndClearErrorMessage = function () {
                var result = this.strErrorMessage;
                this.strErrorMessage = "";
                return result;
            };
            /**
             * @param {string} programText The programText to set.
             */
            PPCGEnv.prototype.setProgramText = function (programText) {
                this.ProgramText = programText;
            };
            /**
             * @return {string} Returns the programText.
             */
            PPCGEnv.prototype.getProgramText = function () {
                return this.ProgramText;
            };
            PPCGEnv.prototype.compileProgram = function () {
                var bResult = true;
                try {
                    var bGenerateCode = false;
                    this.compile.doCompile(bGenerateCode);
                }
                catch (e) {
                    this.recordErrorMessage("Syntactic analysis did not succeed: \n" + e.toString());
                    bResult = false;
                    return bResult;
                }
                try {
                    var bGenerateCode = true;
                    this.compile.doCompile(bGenerateCode);
                    bResult = true;
                }
                catch (e) {
                    this.recordErrorMessage("Semantic analysis did not succeed" + e.toString());
                    bResult = false;
                }
                return bResult;
            };
            PPCGEnv.prototype.PurgeMemory = function () {
                this.setProgramText("");
                if (this.program != null) {
                    /* clear */ (function (obj) { for (var member in obj)
                        delete obj[member]; })(this.program);
                    this.program = null;
                }
                if (this.typeHierarchy != null) {
                    this.typeHierarchy.clear();
                }
                this.typeHierarchy = null;
            };
            PPCGEnv.prototype.Resolve$java_lang_String = function (quest) {
                return this.Resolve$java_lang_String$boolean$boolean(quest, true, false);
            };
            PPCGEnv.prototype.Resolve$java_lang_String$boolean = function (quest, convertRes) {
                return this.Resolve$java_lang_String$boolean$boolean(quest, convertRes, false);
            };
            PPCGEnv.prototype.Resolve$java_lang_String$boolean$boolean = function (quest, convertRes, modeSystmExprt) {
                this.bConvResultToString = convertRes;
                var analysisSucceeded = true;
                try {
                    this.compile.curLineNumber = 1;
                    this.compile.compileQuery(quest);
                }
                catch (e1) {
                    var strMsg = void 0;
                    if (e1.message === ("null request")) {
                        strMsg = "Error : null request";
                    }
                    else {
                        strMsg = e1.message;
                    }
                    this.recordErrorMessage(strMsg);
                    analysisSucceeded = false;
                }
                this.vctResult = ([]);
                if (analysisSucceeded) {
                    this.aResolution = new PrologPlusCG.prolog.Resolution(this, false);
                    this.aResolution.start();
                    try {
                        this.aResolution.join();
                    }
                    catch (iex) {
                    }
                }
                return this.vctResult;
            };
            PPCGEnv.prototype.Resolve = function (quest, convertRes, modeSystmExprt) {
                if (((typeof quest === 'string') || quest === null) && ((typeof convertRes === 'boolean') || convertRes === null) && ((typeof modeSystmExprt === 'boolean') || modeSystmExprt === null)) {
                    return this.Resolve$java_lang_String$boolean$boolean(quest, convertRes, modeSystmExprt);
                }
                else if (((typeof quest === 'string') || quest === null) && ((typeof convertRes === 'boolean') || convertRes === null) && modeSystmExprt === undefined) {
                    return this.Resolve$java_lang_String$boolean(quest, convertRes);
                }
                else if (((typeof quest === 'string') || quest === null) && convertRes === undefined && modeSystmExprt === undefined) {
                    return this.Resolve$java_lang_String(quest);
                }
                else
                    throw new Error('invalid overload');
            };
            PPCGEnv.PPCGVersion = "2.0.17.pre02";
            return PPCGEnv;
        }());
        prolog.PPCGEnv = PPCGEnv;
        PPCGEnv["__class"] = "PrologPlusCG.prolog.PPCGEnv";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        /**
         * @author ulrikp
         * @param {PrologPlusCG.prolog.PPCGEnv} myenv
         * @class
         */
        var PPCGIO = /** @class */ (function () {
            function PPCGIO(myenv) {
                this.env = null;
                this.env = myenv;
            }
            PPCGIO.prototype.showWaitCursor = function () {
            };
            PPCGIO.prototype.showNormalCursor = function () {
            };
            return PPCGIO;
        }());
        prolog.PPCGIO = PPCGIO;
        PPCGIO["__class"] = "PrologPlusCG.prolog.PPCGIO";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var Printer = /** @class */ (function () {
            function Printer(myenv) {
                this.indVar = 0;
                this.printedString = "";
                this.alternatePrintString = "";
                if (this.env === undefined) {
                    this.env = null;
                }
                this.env = myenv;
            }
            Printer.prototype.flush = function () {
                var printedString = this.getPrintedString();
                this.env.io.appendToConsole(printedString);
                this.clearPrintedString();
            };
            /**
             * afin d'eviter l'impression + fois d'une meme relation, on
             * maintient une liste des relations dont on prevoit leur
             * impression. Si on les rencontres par apres lors de l'impression
             * imbriquee, ses relations ne seront pas considerees.  Par ailleurs
             * et lors de l'impression d'un concept C, si une de ses relations
             * est a ignorer car son impression est deja prevue par rapport a un
             * autre concept, alors C sera reimprime et il faut donc lui associer
             * un referent s'il n'en a pas
             * @param {PrologPlusCG.cg.CG} aCG
             * @param {number} level
             * @param {PrologPlusCG.cg.Concept[]} vctConcsVisite
             * @param {PrologPlusCG.cg.Relation[]} vctImprPrevuRels
             */
            Printer.prototype.printCG = function (aCG, level, vctConcsVisite, vctImprPrevuRels) {
                var bFound = false;
                var conc = null;
                for (var listIndex1 = 0; listIndex1 < /* size */ aCG.m_vctConcepts.length && !bFound; ++listIndex1) {
                    {
                        conc = /* get */ aCG.m_vctConcepts[listIndex1];
                        if ( /* isEmpty */(conc.m_vctIncomingRelations.length == 0)) {
                            bFound = true;
                        }
                    }
                    ;
                }
                if (bFound) {
                    this.printCGRelations(conc, aCG, level, vctConcsVisite, vctImprPrevuRels);
                }
                else {
                    this.printCGRelations(aCG.m_vctConcepts[0], aCG, level, vctConcsVisite, vctImprPrevuRels);
                }
                aCG.removeSpecialIdent();
            };
            Printer.prototype.printCGRelations = function (conc, aCG, level, vctConcsVisite, vctImprPrevuRels) {
                /* addElement */ (vctConcsVisite.push(conc) > 0);
                var numberOfChars = this.printConcept(conc, true, level, vctImprPrevuRels);
                if (( /* size */conc.m_vctIncomingRelations.length + /* size */ conc.m_vctOutgoingRelations.length) > 1) {
                    this.printToConsole(" -\n");
                    this.copyRelations(conc.m_vctOutgoingRelations, vctImprPrevuRels);
                    this.copyRelations(conc.m_vctIncomingRelations, vctImprPrevuRels);
                    this.printRelations(conc.m_vctOutgoingRelations, true, aCG, level, numberOfChars, vctConcsVisite, vctImprPrevuRels);
                    if (( /* size */conc.m_vctOutgoingRelations.length > 0) && ( /* size */conc.m_vctIncomingRelations.length > 0)) {
                        this.printToConsole(",\n");
                    }
                    this.printRelations(conc.m_vctIncomingRelations, false, aCG, level, numberOfChars, vctConcsVisite, vctImprPrevuRels);
                }
                else if (!(conc.m_vctIncomingRelations.length == 0)) {
                    this.printRelation(/* get */ conc.m_vctIncomingRelations[0], false, aCG, level, vctConcsVisite, vctImprPrevuRels);
                }
                else if (!(conc.m_vctOutgoingRelations.length == 0)) {
                    this.printRelation(/* get */ conc.m_vctOutgoingRelations[0], true, aCG, level, vctConcsVisite, vctImprPrevuRels);
                }
            };
            Printer.prototype.copyRelations = function (vctRels, vctImprPrevuRels) {
                if ( /* isEmpty */(vctRels.length == 0)) {
                    return;
                }
                var rel;
                for (var listIndex1 = 0; listIndex1 < /* size */ vctRels.length; listIndex1++) {
                    {
                        rel = /* get */ vctRels[listIndex1];
                        /* addElement */ (vctImprPrevuRels.push(rel) > 0);
                    }
                    ;
                }
            };
            Printer.prototype.printRelations = function (vctRels, Direction, aCG, level, Decalage, vctConcsVisite, vctImprPrevuRels) {
                if ( /* isEmpty */(vctRels.length == 0)) {
                    return;
                }
                var rel = vctRels[0];
                this.printSpaces(Decalage);
                this.printRelation(rel, Direction, aCG, level, vctConcsVisite, vctImprPrevuRels);
                for (var listIndex = 0; listIndex < /* size */ vctRels.length; ++listIndex) {
                    {
                        rel = /* get */ vctRels[listIndex];
                        this.printToConsole(",\n");
                        this.printSpaces(Decalage);
                        this.printRelation(rel, Direction, aCG, level, vctConcsVisite, vctImprPrevuRels);
                    }
                    ;
                }
            };
            Printer.prototype.printRelation = function (rel, estRelSort, unGC, niv, vctConcsVisite, vctImprPrevuRels) {
                var DelOuv = null;
                var DelFerm = null;
                var conc = null;
                if (estRelSort) {
                    DelOuv = "-";
                    DelFerm = "->";
                    conc = rel.m_concDestination;
                }
                else {
                    DelOuv = "<-";
                    DelFerm = "-";
                    conc = rel.m_concSource;
                }
                this.printToConsole(DelOuv);
                this.printPrologData(rel.m_pdRelationName, niv);
                this.printToConsole(DelFerm);
                if ( /* contains */(vctConcsVisite.indexOf((conc)) >= 0)) {
                    this.printConcept(conc, false, niv, vctImprPrevuRels);
                }
                else {
                    this.printCGConcept(rel, estRelSort, conc, unGC, niv, vctConcsVisite, vctImprPrevuRels);
                }
            };
            Printer.prototype.printCGConcept = function (rel, estRelSort, conc, unGC, niv, vctConcsVisite, vctImprPrevuRels) {
                /* addElement */ (vctConcsVisite.push(conc) > 0);
                if (!estRelSort) {
                    /* removeElement */ (function (a) { var index = a.indexOf(rel); if (index >= 0) {
                        a.splice(index, 1);
                        return true;
                    }
                    else {
                        return false;
                    } })(conc.m_vctOutgoingRelations);
                }
                else {
                    /* removeElement */ (function (a) { var index = a.indexOf(rel); if (index >= 0) {
                        a.splice(index, 1);
                        return true;
                    }
                    else {
                        return false;
                    } })(conc.m_vctIncomingRelations);
                }
                var nbreCars = this.printConcept(conc, true, niv, vctImprPrevuRels);
                var vctRelEntrsAImpr = ([]);
                this.relationsToPrint(conc.m_vctIncomingRelations, vctRelEntrsAImpr, vctImprPrevuRels);
                var vctRelSortsAImpr = ([]);
                this.relationsToPrint(conc.m_vctOutgoingRelations, vctRelSortsAImpr, vctImprPrevuRels);
                if (( /* size */vctRelEntrsAImpr.length + /* size */ vctRelSortsAImpr.length) > 1) {
                    this.printToConsole(" -\n");
                    this.printRelations(vctRelSortsAImpr, true, unGC, niv, nbreCars, vctConcsVisite, vctImprPrevuRels);
                    if (( /* size */vctRelSortsAImpr.length > 0) && ( /* size */vctRelEntrsAImpr.length > 0)) {
                        this.printToConsole(",\n");
                    }
                    this.printRelations(vctRelEntrsAImpr, false, unGC, niv, nbreCars, vctConcsVisite, vctImprPrevuRels);
                    this.printToConsole(";");
                }
                else if (!(vctRelEntrsAImpr.length == 0)) {
                    this.printRelation(/* get */ vctRelEntrsAImpr[0], false, unGC, niv, vctConcsVisite, vctImprPrevuRels);
                }
                else if (!(vctRelSortsAImpr.length == 0)) {
                    this.printRelation(/* get */ vctRelSortsAImpr[0], true, unGC, niv, vctConcsVisite, vctImprPrevuRels);
                }
                /* clear */ (vctRelEntrsAImpr.length = 0);
                /* clear */ (vctRelSortsAImpr.length = 0);
                if (!estRelSort) {
                    /* addElement */ (conc.m_vctOutgoingRelations.push(rel) > 0);
                }
                else {
                    /* addElement */ (conc.m_vctIncomingRelations.push(rel) > 0);
                }
            };
            Printer.prototype.relationsToPrint = function (vctInitRels, vctRelsAImpr, vctImprPrevuRels) {
                var rel;
                for (var listIndex1 = 0; listIndex1 < /* size */ vctInitRels.length; ++listIndex1) {
                    {
                        rel = /* get */ vctInitRels[listIndex1];
                        if (!(vctImprPrevuRels.indexOf((rel)) >= 0)) {
                            /* addElement */ (vctRelsAImpr.push(rel) > 0);
                            /* addElement */ (vctImprPrevuRels.push(rel) > 0);
                        }
                    }
                    ;
                }
            };
            Printer.prototype.createReferenceSpecification = function () {
                this.indVar++;
                return "*" + /* valueOf */ String(this.indVar).toString();
            };
            Printer.prototype.printConcept = function (conc, premiereFois, niv, vctImprPrevuRels) {
                if (conc.m_pdType == null) {
                    this.printPrologData(conc.m_pdReferent, niv);
                }
                else {
                    this.printToConsole("[");
                    this.printPrologData(conc.m_pdType, niv);
                    var trouve = false;
                    if (premiereFois && (conc.m_pdReferent == null) && (vctImprPrevuRels != null)) {
                        var rel = void 0;
                        for (var listIndex1 = 0; listIndex1 < /* size */ conc.m_vctIncomingRelations.length && !trouve; ++listIndex1) {
                            {
                                rel = /* get */ conc.m_vctIncomingRelations[listIndex1];
                                if ( /* contains */(vctImprPrevuRels.indexOf((rel)) >= 0)) {
                                    trouve = true;
                                }
                            }
                            ;
                        }
                        for (var listIndex2 = 0; listIndex2 < /* size */ conc.m_vctOutgoingRelations.length && !trouve; ++listIndex2) {
                            {
                                rel = /* get */ conc.m_vctOutgoingRelations[listIndex2];
                                if ( /* contains */(vctImprPrevuRels.indexOf((rel)) >= 0)) {
                                    trouve = true;
                                }
                            }
                            ;
                        }
                        if (trouve) {
                            conc.m_pdReferent = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentSpecial, this.createReferenceSpecification());
                        }
                    }
                    if (conc.m_pdReferent != null) {
                        this.printToConsole(" : ");
                        this.printPrologData(conc.m_pdReferent, niv);
                    }
                    if (premiereFois && (conc.m_pdValue != null)) {
                        this.printToConsole(" = ");
                        this.printPrologData(conc.m_pdValue, niv);
                    }
                    this.printToConsole("]");
                }
                return this.numberOfCharsOnCurrentLine();
            };
            Printer.prototype.printSpaces = function (nbreBlancs) {
                var s = { str: "", toString: function () { return this.str; } };
                for (var i = 0; i <= nbreBlancs; i++) { /* append */
                    (function (sb) { sb.str += ' '; return sb; })(s);
                }
                this.printToConsole(/* toString */ s.str);
            };
            /**
             * Universal > Person, Action.
             * Person > Man, Woman.
             * Action > Eat, Work.
             *
             * [Man]-agnt->[Work].
             * [Woman]-agnt->[Work].
             * @return {number}
             */
            Printer.prototype.numberOfCharsOnCurrentLine = function () {
                var myString;
                if (this.env.bWriteToDebugTree || this.env.bWriteToToolTip) {
                    console.info("UP100: env.bWriteToDebugTree || env.bWriteToToolTip");
                    myString = this.alternatePrintString;
                }
                else {
                    myString = this.printedString;
                }
                var nLastIndexOfNewline = myString.lastIndexOf('\n');
                if (nLastIndexOfNewline === -1) {
                    return myString.length;
                }
                else {
                    return myString.length - nLastIndexOfNewline;
                }
            };
            Printer.prototype.printTerm$PrologPlusCG_prolog_PrologTerm = function (pTerme) {
                this.printTerm$PrologPlusCG_prolog_PrologTerm$int(pTerme, -1);
            };
            Printer.prototype.printTerm$PrologPlusCG_prolog_PrologTerm$int = function (pTerm, level) {
                this.printPrologData(pTerm.get(0), level);
                var IndDernier = pTerm.size() - 1;
                if (IndDernier >= 1) {
                    this.printToConsole("(");
                    this.printPrologData(pTerm.elementAt(1), level);
                    for (var i = 2; i <= IndDernier; i++) {
                        {
                            this.printToConsole(", ");
                            this.printPrologData(pTerm.elementAt(i), level);
                        }
                        ;
                    }
                    this.printToConsole(")");
                }
            };
            Printer.prototype.printTerm = function (pTerm, level) {
                if (((pTerm != null && pTerm instanceof PrologPlusCG.prolog.PrologTerm) || pTerm === null) && ((typeof level === 'number') || level === null)) {
                    return this.printTerm$PrologPlusCG_prolog_PrologTerm$int(pTerm, level);
                }
                else if (((pTerm != null && pTerm instanceof PrologPlusCG.prolog.PrologTerm) || pTerm === null) && level === undefined) {
                    return this.printTerm$PrologPlusCG_prolog_PrologTerm(pTerm);
                }
                else
                    throw new Error('invalid overload');
            };
            Printer.prototype.printSet = function (pLstPrlg, niv) {
                this.printToConsole("{");
                var nbreElems = pLstPrlg.size();
                var indElemCour = 0;
                try {
                    this.printPrologData(pLstPrlg.get(indElemCour), niv);
                    indElemCour++;
                }
                catch (aiobex) {
                }
                while ((indElemCour < nbreElems)) {
                    {
                        this.printToConsole(", ");
                        this.printPrologData(pLstPrlg.get(indElemCour), niv);
                        indElemCour++;
                    }
                }
                ;
                this.printToConsole("}");
            };
            Printer.prototype.printList = function (pLstPrlg, niv) {
                this.printToConsole("(");
                var nbreElems = pLstPrlg.size();
                var indElemCour = 0;
                if (nbreElems > 0) {
                    this.printPrologData(pLstPrlg.elementAt(indElemCour), niv);
                    indElemCour++;
                }
                while ((indElemCour < nbreElems)) {
                    {
                        if ((pLstPrlg.elementAt(indElemCour).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList) && (niv !== -1)) {
                            var contr = this.env.unification.valueFromUnifStack(pLstPrlg.elementAt(indElemCour), niv);
                            if (contr.pData == null) {
                                this.printToConsole("|FREE");
                                indElemCour = nbreElems;
                            }
                            else {
                                pLstPrlg = contr.pData.data;
                                nbreElems = pLstPrlg.size();
                                indElemCour = 0;
                                niv = contr.index;
                                if (nbreElems > 0) {
                                    this.printToConsole(", ");
                                    this.printPrologData(pLstPrlg.elementAt(indElemCour), niv);
                                    indElemCour++;
                                }
                            }
                            contr = null;
                        }
                        else {
                            if (pLstPrlg.elementAt(indElemCour).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList) {
                                this.printToConsole("|");
                            }
                            else {
                                this.printToConsole(", ");
                            }
                            this.printPrologData(pLstPrlg.elementAt(indElemCour), niv);
                            indElemCour++;
                        }
                    }
                }
                ;
                this.printToConsole(")");
            };
            Printer.prototype.printPrologData = function (pDon, niv, uChaineShouldBeStrippedOfQuotations) {
                if (uChaineShouldBeStrippedOfQuotations === void 0) { uChaineShouldBeStrippedOfQuotations = false; }
                if (pDon == null) {
                    this.printToConsole("FREE");
                }
                else {
                    switch ((pDon.typeOfData)) {
                        case 0 /* uNumber */:
                            this.printToConsole(pDon.data.toString());
                            break;
                        case 1 /* uBoolean */:
                            this.printToConsole(pDon.data.toString());
                            break;
                        case 28 /* uIdentSpecial */:
                        case 2 /* uIdentifier */:
                        case 10 /* uPeriod */:
                        case 6 /* uComma */:
                        case 22 /* uSemicolon */:
                        case 38 /* uExclamationMark */:
                        case 39 /* uQuestionMark */:
                            this.printToConsole(pDon.data);
                            break;
                        case 3 /* uString */:
                            if (uChaineShouldBeStrippedOfQuotations) {
                                var s = pDon.data;
                                if (s.length >= 2 && (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(s.charAt(0)) == '\"'.charCodeAt(0) && (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(s.charAt(s.length - 1)) == '\"'.charCodeAt(0)) {
                                    this.printToConsole(s.substring(1, s.length - 1));
                                }
                                else {
                                    this.printToConsole(s);
                                }
                                s = null;
                            }
                            else {
                                this.printToConsole(pDon.data);
                            }
                            break;
                        case 4 /* uVariable */:
                        case 12 /* uVarList */:
                            if (niv === -1) {
                                this.printToConsole(pDon.data);
                            }
                            else {
                                var contr = this.env.unification.valueFromUnifStack(pDon, niv);
                                if (contr.pData != null) {
                                    this.printPrologData(contr.pData, contr.index, uChaineShouldBeStrippedOfQuotations);
                                }
                                else {
                                    this.printToConsole(pDon.data);
                                }
                                contr = null;
                            }
                            break;
                        case 11 /* uTerm */:
                            this.printTerm$PrologPlusCG_prolog_PrologTerm$int(pDon.data, niv);
                            break;
                        case 37 /* uConcept */:
                            this.printConcept(pDon.data, true, niv, null);
                            break;
                        case 14 /* uCG */:
                            {
                                var vctConcsVisite = ([]);
                                var vctImprPrevuRels = ([]);
                                this.printCG(pDon.data, niv, vctConcsVisite, vctImprPrevuRels);
                                /* clear */ (vctConcsVisite.length = 0);
                                vctConcsVisite = null;
                                /* clear */ (vctImprPrevuRels.length = 0);
                                vctImprPrevuRels = null;
                            }
                            ;
                            break;
                        case 13 /* uList */:
                            this.printList(pDon.data, niv);
                            break;
                        case 44 /* uSet */:
                            this.printSet(pDon.data, niv);
                            break;
                        case 43 /* uObject */:
                            this.printToConsole(pDon.data.toString());
                    }
                }
            };
            Printer.prototype.printPrologProgram = function () {
                var keys = Object.keys(this.env.program);
                for (var index = 0; index < keys.length; index++) {
                    var key = keys[index];
                    {
                        var value = (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.env.program, key);
                        this.printRules(value, key);
                        this.printToConsole("\n");
                    }
                }
            };
            Printer.prototype.printRules = function (pRegles, cle) {
                for (var listIndex = 0; listIndex < pRegles.size(); ++listIndex) {
                    {
                        this.printRule(pRegles.get(listIndex), cle);
                    }
                    ;
                }
            };
            Printer.prototype.printRule = function (pRegle, cle) {
                if ( /* startsWith */(function (str, searchString, position) {
                    if (position === void 0) { position = 0; }
                    return str.substr(position, searchString.length) === searchString;
                })(cle, this.env.compile.valSysGEN)) {
                    var unTrmTmp = pRegle.getAt(0).getAt(1).data;
                    this.printGoal(unTrmTmp);
                }
                else {
                    this.printGoal(pRegle.get(0));
                }
                if (pRegle.size() > 1) {
                    if (cle === this.env.compile.valSysSP) {
                        this.printToConsole(" > ");
                        this.printTail(pRegle);
                    }
                    else if (cle === this.env.compile.valSysINST) {
                        this.printToConsole(" = ");
                        this.printTail(pRegle);
                    }
                    else if ( /* startsWith */(function (str, searchString, position) {
                        if (position === void 0) { position = 0; }
                        return str.substr(position, searchString.length) === searchString;
                    })(cle, this.env.compile.valSysGEN)) {
                        this.printToConsole(" <- ");
                        this.printGoal(pRegle.getAt(1).getAt(1).data);
                    }
                    else {
                        this.printToConsole(" :- ");
                        this.printTail(pRegle);
                    }
                }
                this.printToConsole(".\n");
            };
            Printer.prototype.printTail = function (pRegle) {
                var AvDernier = pRegle.size() - 2;
                for (var i = 1; i <= AvDernier; i++) {
                    {
                        this.printGoal(pRegle.elementAt(i));
                        this.printToConsole(", ");
                    }
                    ;
                }
                this.printGoal(pRegle.elementAt(AvDernier + 1));
            };
            Printer.prototype.printGoal = function (pTerme) {
                this.indVar = 0;
                var donIdTerm = pTerme.get(0);
                if ((donIdTerm.typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (donIdTerm.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)) {
                    this.printPrologData(donIdTerm, -1);
                }
                else if ((donIdTerm.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) && /* startsWith */ (function (str, searchString, position) {
                    if (position === void 0) { position = 0; }
                    return str.substr(position, searchString.length) === searchString;
                })(donIdTerm.data, this.env.compile.valSysCleBtCp)) {
                    this.printPrologData(pTerme.elementAt(1), -1);
                    this.printToConsole("::");
                    this.printPrologData(pTerme.elementAt(2), -1);
                }
                else {
                    this.printTerm$PrologPlusCG_prolog_PrologTerm$int(pTerme, -1);
                }
            };
            Printer.prototype.printToConsole = function (s) {
                if (this.env.bWriteToDebugTree || this.env.bWriteToToolTip) {
                    this.alternatePrintString += s;
                }
                else {
                    this.printedString += s;
                }
            };
            Printer.prototype.getPrintedString = function () {
                return this.printedString;
            };
            Printer.prototype.clearPrintedString = function () {
                this.printedString = "";
            };
            Printer.prototype.writeOrRecordResult = function (resolutionWithInterface) {
                this.clearPrintedString();
                if (resolutionWithInterface) {
                    this.writeResult();
                }
                else {
                    this.recordResult();
                }
            };
            Printer.prototype.writeResult = function () {
                this.printToConsole("{");
                var recUnif = this.env.unification.Unif_Stack.get(0);
                if (recUnif.isEmpty()) {
                    this.printToConsole("}\n");
                }
                else {
                    var sVar = void 0;
                    var sDerVar = (function (a) { return a.length == 0 ? null : a[a.length - 1]; })(this.env.compile.vctVariableIdentifiersInQuery);
                    /* removeElementAt */ this.env.compile.vctVariableIdentifiersInQuery.splice(/* size */ this.env.compile.vctVariableIdentifiersInQuery.length - 1, 1);
                    var pCLContr = void 0;
                    for (var listIndex1 = 0; listIndex1 < /* size */ this.env.compile.vctVariableIdentifiersInQuery.length; ++listIndex1) {
                        {
                            sVar = /* get */ this.env.compile.vctVariableIdentifiersInQuery[listIndex1];
                            this.printToConsole(sVar + "=");
                            pCLContr = recUnif.get(sVar);
                            this.indVar = 0;
                            if ((pCLContr != null) && (pCLContr.ValInd != null)) {
                                this.printPrologData(pCLContr.ValInd.pData, pCLContr.ValInd.index);
                            }
                            else {
                                this.printPrologData(null, 0);
                            }
                            this.printToConsole(", ");
                        }
                        ;
                    }
                    /* addElement */ (this.env.compile.vctVariableIdentifiersInQuery.push(sDerVar) > 0);
                    this.printToConsole(sDerVar + "=");
                    pCLContr = recUnif.get(sDerVar);
                    this.indVar = 0;
                    if ((pCLContr != null) && (pCLContr.ValInd != null)) {
                        this.printPrologData(pCLContr.ValInd.pData, pCLContr.ValInd.index);
                    }
                    else {
                        this.printPrologData(null, 0);
                    }
                    sVar = sDerVar = null;
                    pCLContr = null;
                    this.printToConsole("}\n");
                }
                this.flush();
                recUnif = null;
            };
            Printer.prototype.recordResult = function () {
                var recUnif = this.env.unification.Unif_Stack.get(0);
                if (!recUnif.isEmpty()) {
                    var hashResult = ({});
                    var strVar = void 0;
                    var pCLContr = void 0;
                    for (var listIndex1 = 0; listIndex1 < /* size */ this.env.compile.vctVariableIdentifiersInQuery.length; ++listIndex1) {
                        {
                            strVar = /* get */ this.env.compile.vctVariableIdentifiersInQuery[listIndex1];
                            pCLContr = recUnif.get(strVar);
                            this.indVar = 0;
                            var sValue = null;
                            if ((pCLContr != null) && (pCLContr.ValInd != null) && this.env.bConvResultToString) {
                                this.alternatePrintString = "";
                                this.clearPrintedString();
                                this.printPrologData(pCLContr.ValInd.pData, pCLContr.ValInd.index);
                                sValue = this.alternatePrintString;
                                this.alternatePrintString = "";
                                this.clearPrintedString();
                                /* put */ (hashResult[strVar] = sValue);
                            }
                            else if ((pCLContr != null) && (pCLContr.ValInd != null)) {
                                this.alternatePrintString = "";
                                this.clearPrintedString();
                                this.printPrologData(pCLContr.ValInd.pData, pCLContr.ValInd.index);
                                var unVct = null;
                                try {
                                    unVct = this.env.compile.compileAlternatePrintString(this.alternatePrintString);
                                }
                                catch (cpExc) {
                                }
                                this.alternatePrintString = "";
                                this.clearPrintedString();
                                /* put */ (hashResult[strVar] = /* toString */ ('[' + unVct.join(', ') + ']'));
                            }
                            else {
                                sValue = "FREE";
                                /* put */ (hashResult[strVar] = sValue);
                            }
                        }
                        ;
                    }
                    strVar = null;
                    pCLContr = null;
                    /* addElement */ (this.env.vctResult.push(hashResult) > 0);
                }
                recUnif = null;
            };
            return Printer;
        }());
        prolog.Printer = Printer;
        Printer["__class"] = "PrologPlusCG.prolog.Printer";
        Printer["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var PrologData = /** @class */ (function () {
            function PrologData(typObj, ObjPrlg) {
                if (((typeof typObj === 'number') || typObj === null) && ((ObjPrlg != null) || ObjPrlg === null)) {
                    var __args = arguments;
                    if (this.data === undefined) {
                        this.data = null;
                    }
                    if (this.typeOfData === undefined) {
                        this.typeOfData = 0;
                    }
                    this.typeOfData = typObj;
                    this.data = ObjPrlg;
                }
                else if (typObj === undefined && ObjPrlg === undefined) {
                    var __args = arguments;
                    if (this.data === undefined) {
                        this.data = null;
                    }
                    if (this.typeOfData === undefined) {
                        this.typeOfData = 0;
                    }
                }
                else
                    throw new Error('invalid overload');
            }
            PrologData.prototype.myDestroy = function () {
                switch ((this.typeOfData)) {
                    case 0 /* uNumber */:
                    case 1 /* uBoolean */:
                    case 2 /* uIdentifier */:
                    case 3 /* uString */:
                    case 4 /* uVariable */:
                    case 12 /* uVarList */:
                        this.data = null;
                        break;
                    case 11 /* uTerm */:
                        {
                            this.data.myDestroy();
                            this.data = null;
                        }
                        ;
                        break;
                    case 44 /* uSet */:
                    case 13 /* uList */:
                        this.data.myDestroy();
                        break;
                    case 14 /* uCG */:
                        this.data.myDestroy();
                        break;
                }
            };
            PrologData.prototype.valString = function () {
                return this.data;
            };
            PrologData.prototype.myCopy = function () {
                var nouvObj = null;
                switch ((this.typeOfData)) {
                    case 0 /* uNumber */:
                        if (typeof this.data === 'number') {
                            var valLong = this.data;
                            nouvObj = new Number(valLong).valueOf();
                        }
                        else {
                            var valDble = this.data;
                            nouvObj = new Number(valDble).valueOf();
                        }
                        break;
                    case 1 /* uBoolean */:
                        {
                            var valBool = this.data;
                            if (valBool) {
                                nouvObj = true;
                            }
                            else {
                                nouvObj = false;
                            }
                        }
                        ;
                        break;
                    case 2 /* uIdentifier */:
                    case 3 /* uString */:
                    case 4 /* uVariable */:
                    case 12 /* uVarList */:
                        nouvObj = this.data;
                        break;
                    case 11 /* uTerm */:
                        nouvObj = this.data.myCopy();
                        break;
                    case 44 /* uSet */:
                    case 13 /* uList */:
                        nouvObj = this.data.myCopy();
                        break;
                    case 14 /* uCG */:
                        nouvObj = this.data.myCopy();
                        break;
                }
                return new PrologData(this.typeOfData, nouvObj);
            };
            return PrologData;
        }());
        prolog.PrologData = PrologData;
        PrologData["__class"] = "PrologPlusCG.prolog.PrologData";
        PrologData["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var PrologDataIndexPair = /** @class */ (function () {
            function PrologDataIndexPair(data, i) {
                if (((data != null && data instanceof PrologPlusCG.prolog.PrologData) || data === null) && ((typeof i === 'number') || i === null)) {
                    var __args = arguments;
                    if (this.pData === undefined) {
                        this.pData = null;
                    }
                    if (this.index === undefined) {
                        this.index = 0;
                    }
                    this.pData = data;
                    this.index = i;
                }
                else if (data === undefined && i === undefined) {
                    var __args = arguments;
                    if (this.pData === undefined) {
                        this.pData = null;
                    }
                    if (this.index === undefined) {
                        this.index = 0;
                    }
                    this.pData = null;
                    this.index = 0;
                }
                else
                    throw new Error('invalid overload');
            }
            return PrologDataIndexPair;
        }());
        prolog.PrologDataIndexPair = PrologDataIndexPair;
        PrologDataIndexPair["__class"] = "PrologPlusCG.prolog.PrologDataIndexPair";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var PrologDataVector = /** @class */ (function () {
            function PrologDataVector(a, b) {
                if (((typeof a === 'number') || a === null) && ((typeof b === 'number') || b === null)) {
                    var __args = arguments;
                    this.vec = null;
                    this.vec = ([]);
                }
                else if (a === undefined && b === undefined) {
                    var __args = arguments;
                    this.vec = null;
                    this.vec = ([]);
                }
                else
                    throw new Error('invalid overload');
            }
            PrologDataVector.prototype.get = function (index) {
                return /* get */ this.vec[index];
            };
            PrologDataVector.prototype.clear = function () {
                /* clear */ (this.vec.length = 0);
            };
            PrologDataVector.prototype.elementAt = function (index) {
                return this.get(index);
            };
            PrologDataVector.prototype.lastElement = function () {
                var mySize = this.size();
                if (mySize === 0) {
                    throw Object.defineProperty(new Error(), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.util.NoSuchElementException', 'java.lang.Exception'] });
                }
                else {
                    return this.get(mySize - 1);
                }
            };
            PrologDataVector.prototype.set = function (index, pd) {
                /* set */ (this.vec[index] = pd);
            };
            PrologDataVector.prototype.isEmpty = function () {
                return /* size */ this.vec.length === 0;
            };
            PrologDataVector.prototype.size = function () {
                return /* size */ this.vec.length;
            };
            PrologDataVector.prototype.addElement = function (pd) {
                /* add */ (this.vec.push(pd) > 0);
            };
            PrologDataVector.prototype.add = function (pd) {
                /* add */ (this.vec.push(pd) > 0);
            };
            PrologDataVector.prototype.shuffle$ = function () {
                var rnd = new PrologPlusCG.prolog.RandomSource();
                this.shuffle$PrologPlusCG_prolog_RandomSource(rnd);
            };
            PrologDataVector.prototype.shuffle$PrologPlusCG_prolog_RandomSource = function (rnd) {
                var mySize = this.size();
                for (var i = mySize; i > 0; i--) {
                    {
                        this.swap(i - 1, ((rnd.nextRnd() % mySize) | 0));
                    }
                    ;
                }
            };
            PrologDataVector.prototype.shuffle = function (rnd) {
                if (((rnd != null && rnd instanceof PrologPlusCG.prolog.RandomSource) || rnd === null)) {
                    return this.shuffle$PrologPlusCG_prolog_RandomSource(rnd);
                }
                else if (rnd === undefined) {
                    return this.shuffle$();
                }
                else
                    throw new Error('invalid overload');
            };
            PrologDataVector.prototype.swap = function (i1, i2) {
                var tmp = this.get(i1);
                this.set(i1, this.get(i2));
                this.set(i2, tmp);
            };
            PrologDataVector.prototype.trimToSize = function () {
            };
            return PrologDataVector;
        }());
        prolog.PrologDataVector = PrologDataVector;
        PrologDataVector["__class"] = "PrologPlusCG.prolog.PrologDataVector";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var PrologRule = /** @class */ (function () {
            function PrologRule() {
                if (this.vec === undefined) {
                    this.vec = null;
                }
                this.vec = ([]);
            }
            PrologRule.prototype.getAt = function (i) {
                return /* get */ this.vec[i];
            };
            PrologRule.prototype.get = function (i) {
                return /* get */ this.vec[i];
            };
            PrologRule.prototype.elementAt = function (i) {
                return /* get */ this.vec[i];
            };
            PrologRule.prototype.set = function (index, pt) {
                /* set */ (this.vec[index] = pt);
            };
            PrologRule.prototype.trimToSize = function () {
            };
            PrologRule.prototype.size = function () {
                return /* size */ this.vec.length;
            };
            PrologRule.prototype.clear = function () {
                /* clear */ (this.vec.length = 0);
            };
            PrologRule.prototype.myDestroy = function () {
                if (this.size() === 0) {
                    return;
                }
                else {
                    var aTerm = void 0;
                    for (var listIndex1 = 0; listIndex1 < /* size */ this.vec.length; ++listIndex1) {
                        {
                            aTerm = /* get */ this.vec[listIndex1];
                            aTerm.myDestroy();
                        }
                        ;
                    }
                    this.clear();
                }
            };
            PrologRule.prototype.hasOnlyAtoms = function (env) {
                if (this.size() === 0) {
                    return true;
                }
                else {
                    var aTerm = void 0;
                    for (var listIndex1 = 0; listIndex1 < /* size */ this.vec.length; ++listIndex1) {
                        {
                            aTerm = /* get */ this.vec[listIndex1];
                            if (!aTerm.hasOnlyAtoms(env)) {
                                return false;
                            }
                        }
                        ;
                    }
                    return true;
                }
            };
            PrologRule.prototype.firstElement = function () {
                return /* get */ this.vec[0];
            };
            PrologRule.prototype.addTerm = function (terme) {
                /* addElement */ (this.vec.push(terme) > 0);
            };
            return PrologRule;
        }());
        prolog.PrologRule = PrologRule;
        PrologRule["__class"] = "PrologPlusCG.prolog.PrologRule";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var RandomSource = /** @class */ (function () {
            function RandomSource() {
                if (this.curSeed === undefined) {
                    this.curSeed = 0;
                }
                var nowDate = new Date();
                this.curSeed = nowDate.getTime();
            }
            RandomSource.prototype.setSeed = function (newSeed) {
                this.curSeed = newSeed;
            };
            RandomSource.prototype.next = function (bits) {
                this.advance();
                return ((this.curSeed >>> (31 - bits)) | 0);
            };
            RandomSource.prototype.nextRnd = function () {
                this.advance();
                return this.curSeed;
            };
            RandomSource.prototype.nextLong = function () {
                return ((function (n) { return n < 0 ? Math.ceil(n) : Math.floor(n); })(this.next(31)));
            };
            RandomSource.prototype.advance = function () {
                this.curSeed = (this.curSeed * 6155981 + 2865) & ((1 << 31) - 1);
            };
            RandomSource.prototype.nextDouble = function () {
                var nextVal = ((function (n) { return n < 0 ? Math.ceil(n) : Math.floor(n); })((this.next(15))) << 15) + this.next(15);
                if (nextVal < 0) {
                    nextVal = -nextVal;
                }
                return nextVal / (1 << 30);
            };
            return RandomSource;
        }());
        prolog.RandomSource = RandomSource;
        RandomSource["__class"] = "PrologPlusCG.prolog.RandomSource";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var RelationUnification = /** @class */ (function () {
            function RelationUnification(r1, r2) {
                if (this.m_RelMatched1 === undefined) {
                    this.m_RelMatched1 = null;
                }
                if (this.m_RelMatched2 === undefined) {
                    this.m_RelMatched2 = null;
                }
                this.m_RelMatched1 = r1;
                this.m_RelMatched2 = r2;
            }
            RelationUnification.prototype.myDestroy = function () {
                this.m_RelMatched1 = null;
                this.m_RelMatched2 = null;
            };
            return RelationUnification;
        }());
        prolog.RelationUnification = RelationUnification;
        RelationUnification["__class"] = "PrologPlusCG.prolog.RelationUnification";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var Resolution = /** @class */ (function () {
            function Resolution(myenv, mode) {
                this.Exec_Stack = new PrologPlusCG.prolog.ResolutionStack();
                this.Return_Stack = new PrologPlusCG.prolog.ResolutionStack();
                this.pRules = null;
                this.globalPrlgPCGObjs = ({});
                this.rndRandom = new PrologPlusCG.prolog.RandomSource();
                this.programModified = false;
                this.cptVarBid = 0;
                this.strEndOfPredefinedGoals = "$!$End%dnE$!$";
                this.PredefinedGoals = ["not", "findall", "/", "member", "length", "read", "read_sentence", "write", "writenl", "nl", "clearConsole", "asserta", "assertz", "retract", "suppress", "term_list", "free", "val", "sup", "inf", "eqv", "eq", "add", "sub", "mul", "dif", "div", "rnd", "seed", "concat", "stringToLetters", "identToLetters", "isSubType", "isSuperType", "subTypes", "superTypes", "minComSuperTypes", "minComSuperType", "maximalJoin", "generalize", "subsume", "addElemForAll", "createInstance", "fail", "concOfCG", "immediateSubTypes", "immediateSuperTypes", "external", "destroy", "destroyAll", "set_list", "branchOfCG", "isInstance", "addInstance", "maxComSubTypes", "maxComSubType", "objectify", "shuffle", this.strEndOfPredefinedGoals];
                this.bResolveWithInterface = true;
                this.env = null;
                this.env = myenv;
                this.bResolveWithInterface = mode;
            }
            Resolution.prototype.start = function () {
                this.run();
            };
            Resolution.prototype.join = function () {
            };
            Resolution.prototype.run = function () {
                if (this.bResolveWithInterface) {
                    try {
                        this.env.io.showWaitCursor();
                        this.executeQuery();
                    }
                    catch (__e) {
                        if (__e != null && __e instanceof PrologPlusCG.prolog.CompileException) {
                            var cpleExc = __e;
                            this.env.io.showMessageDialog(cpleExc.message, "Warning");
                        }
                        if (__e != null && __e instanceof PrologPlusCG.prolog.ExecException) {
                            var eexec = __e;
                            if (eexec.message === ("program null")) {
                                this.env.io.showMessageDialog("Please, Compile your program first.", "Warning");
                            }
                            else {
                                this.env.io.appendToConsole(eexec.message + "\n");
                            }
                        }
                    }
                    this.env.io.showNormalCursor();
                    this.env.io.showPrompt();
                }
                else {
                    try {
                        this.executeQuery();
                    }
                    catch (__e) {
                        if (__e != null && __e instanceof PrologPlusCG.prolog.CompileException) {
                            var cpleExc = __e;
                            var strMsg = "Compiler Warning : " + cpleExc.message;
                            this.env.recordErrorMessage(strMsg);
                        }
                        if (__e != null && __e instanceof PrologPlusCG.prolog.ExecException) {
                            var eexec = __e;
                            var strMsg = "Execution Warning : " + eexec.message;
                            this.env.recordErrorMessage(strMsg);
                        }
                    }
                }
            };
            Resolution.prototype.executeQuery = function () {
                var package_is_known = false;
                var unifiable = false;
                var contr = null;
                var TermRes = null;
                this.cptVarBid = 0;
                this.env.unification.Unif_Stack.makeEmpty();
                this.Exec_Stack.makeEmpty();
                this.Return_Stack.makeEmpty();
                this.env.unification.Unif_Stack.pushEmptyRecord();
                this.push_tail(this.env.pCurRule, 0, 0, -1);
                this.env.pCurRule.clear();
                this.env.pCurRule = null;
                var finished = false;
                var solvable = false;
                this.programModified = false;
                while ((!finished && !this.env.bStopExec)) {
                    {
                        while ((!this.Exec_Stack.isEmpty() && !this.env.bStopExec)) {
                            {
                                TermRes = this.Exec_Stack.getTop();
                                unifiable = false;
                                package_is_known = (TermRes.pos !== 0);
                                var IdVar = this.variable_goal(TermRes.pTerm);
                                if (IdVar != null) {
                                    if (!package_is_known) {
                                        var valButVar = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uVariable, IdVar);
                                        contr = this.env.unification.valueFromUnifStack(valButVar, TermRes.index);
                                        valButVar = null;
                                        if ((contr.pData == null) || ((contr.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uTerm) && (contr.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uCG))) {
                                            throw new PrologPlusCG.prolog.ExecException("Error: The variable goal " + IdVar + " is free or it is not a term nor a CG. ");
                                        }
                                        if (contr.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) {
                                            var aTerm = new PrologPlusCG.prolog.PrologTerm();
                                            aTerm.addData(contr.pData);
                                            contr.pData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, aTerm);
                                        }
                                        this.env.unification.Unif_Stack.pushEmptyRecord();
                                        TermRes.indexInExecStack = this.Exec_Stack.indexOfTop();
                                        TermRes.pos = -1;
                                        this.Return_Stack.push(this.Exec_Stack.pop());
                                        TermRes = new PrologPlusCG.prolog.TermToBeResolved(contr.pData.data, contr.index, 0);
                                        this.Exec_Stack.push(TermRes);
                                        IdVar = null;
                                    }
                                    else {
                                        TermRes.pos = 0;
                                    }
                                }
                                if (IdVar == null) {
                                    var IdPred = null;
                                    if (TermRes.pTerm.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) {
                                        IdPred = TermRes.pTerm.getAt(0).data;
                                    }
                                    if ((IdPred != null) && this.identifierIsPredefinedGoal(IdPred)) {
                                        if (!package_is_known) {
                                            unifiable = this.satisfyPredicateGoal(TermRes, IdPred);
                                        }
                                        else {
                                            unifiable = this.resatisfyPredicateGoal(TermRes, IdPred);
                                        }
                                    }
                                    else {
                                        this.pRules = null;
                                        try {
                                            if (!package_is_known && (TermRes.pos > -1)) {
                                                TermRes.Cle = this.env.compile.nameOfArgument(TermRes.pTerm, TermRes.index);
                                                if ( /* containsKey */this.env.program.hasOwnProperty(TermRes.Cle)) {
                                                    this.pRules = (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.env.program, TermRes.Cle);
                                                }
                                                else {
                                                    TermRes.pos = -2;
                                                }
                                            }
                                            else if (TermRes.pos > -1) {
                                                this.pRules = (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.env.program, TermRes.Cle);
                                            }
                                        }
                                        catch (ex) {
                                            if (this.env.program == null) {
                                                this.env.io.showMessageDialog("No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, \n retract and suppress) can be satisfied.", "Warning");
                                                TermRes.pos = -1;
                                                this.Return_Stack.makeEmpty();
                                            }
                                            var strMessage = "Null pointer exception: " + ex.message;
                                            this.env.recordErrorMessage(strMessage);
                                        }
                                        IdPred = null;
                                        unifiable = this.isUnifiable(TermRes);
                                        if (!unifiable && (TermRes.pos !== -1) && /* startsWith */ (function (str, searchString, position) {
                                            if (position === void 0) { position = 0; }
                                            return str.substr(position, searchString.length) === searchString;
                                        })(TermRes.Cle, this.env.compile.valSysCleBtCp) && (TermRes.Cle.length !== this.env.compile.valSysCleBtCp.length)) {
                                            var ClePaquet = this.env.compile.valSysGEN + TermRes.Cle.substring(this.env.compile.valSysCleBtCp.length);
                                            if ( /* containsKey */this.env.program.hasOwnProperty(ClePaquet)) {
                                                var regles = (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.env.program, ClePaquet);
                                                this.env.unification.Unif_Stack.pushEmptyRecord();
                                                var TopOfUnification_Stack = this.env.unification.Unif_Stack.indexOfTop();
                                                var DonCple1 = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, TermRes.pTerm);
                                                var DonCple2 = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, regles.getAt(0).getAt(0));
                                                unifiable = this.env.unification.unify(DonCple2, TopOfUnification_Stack, DonCple1, TermRes.index);
                                                if (unifiable) {
                                                    TermRes.indexInExecStack = this.Exec_Stack.indexOfTop();
                                                    TermRes.pos = -1;
                                                    this.Return_Stack.push(this.Exec_Stack.pop());
                                                    this.Exec_Stack.push(new PrologPlusCG.prolog.TermToBeResolved(regles.getAt(0).getAt(1), TopOfUnification_Stack, 0));
                                                }
                                                else {
                                                    this.env.unification.Unif_Stack.pop();
                                                    TermRes.pos = 0;
                                                }
                                            }
                                            else {
                                                TermRes.pos = 0;
                                            }
                                        }
                                        else if (!unifiable) {
                                            TermRes.pos = 0;
                                        }
                                    }
                                }
                                if (!unifiable && this.theGoalBelowOnTheStackIsNot()) {
                                    this.Exec_Stack.pop();
                                    var unTermRes = this.Exec_Stack.getTop();
                                    unTermRes.pos = -2;
                                    unTermRes.indexInExecStack = -1;
                                    this.env.unification.Unif_Stack.pushEmptyRecord();
                                    this.Return_Stack.push(this.Exec_Stack.pop());
                                    unifiable = true;
                                }
                                if (!unifiable && this.Return_Stack.isEmpty()) {
                                    this.Exec_Stack.makeEmpty();
                                    this.env.unification.Unif_Stack.makeEmpty();
                                    if (!solvable) {
                                        if (this.bResolveWithInterface) {
                                            this.env.io.appendToConsole(" no.\n");
                                        }
                                        else {
                                            this.env.vctResult = null;
                                        }
                                    }
                                    /* clear */ (this.env.compile.vctVariableIdentifiersInQuery.length = 0);
                                    finished = true;
                                }
                                else if (!unifiable) {
                                    this.backTrack();
                                }
                            }
                        }
                        ;
                        if (!this.Return_Stack.isEmpty() && !this.env.bStopExec) {
                            solvable = true;
                            this.env.printer.writeOrRecordResult(!this.env.bIsApplet);
                            this.backTrack();
                            if (!this.Exec_Stack.isEmpty()) {
                                TermRes = this.Exec_Stack.getTop();
                            }
                        }
                        else {
                            finished = true;
                        }
                    }
                }
                ;
                this.env.unification.Unif_Stack.makeEmpty();
                if (this.env.bStopExec) {
                    this.Exec_Stack.makeEmpty();
                    this.Return_Stack.makeEmpty();
                    this.env.bStopExec = false;
                }
                if (this.programModified) {
                    this.env.bWriteToDebugTree = true;
                    this.env.printer.alternatePrintString = "";
                    this.env.printer.printPrologProgram();
                    this.env.io.setProgramText(this.env.printer.alternatePrintString);
                    this.env.printer.alternatePrintString = "";
                    this.env.bWriteToDebugTree = false;
                }
            };
            Resolution.prototype.isUnifiable = function (TermRes) {
                var unifiable = false;
                var taillePaq = -3;
                var Donnee1 = null;
                if (TermRes.pos > -1) {
                    taillePaq = this.pRules.size();
                    Donnee1 = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, TermRes.pTerm);
                }
                var pRegleLocal;
                while (((TermRes.pos < taillePaq) && (!unifiable))) {
                    {
                        pRegleLocal = this.pRules.getAt(TermRes.pos);
                        TermRes.pos++;
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        var TopOfUnification_Stack = this.env.unification.Unif_Stack.indexOfTop();
                        var Donnee2 = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, pRegleLocal.getAt(0));
                        unifiable = this.env.unification.unify(Donnee2, TopOfUnification_Stack, Donnee1, TermRes.index);
                        Donnee2 = null;
                        if (unifiable) {
                            TermRes.indexInExecStack = this.Exec_Stack.indexOfTop();
                            this.Return_Stack.push(this.Exec_Stack.pop());
                            this.push_tail(pRegleLocal, 1, TopOfUnification_Stack, this.Return_Stack.indexOfTop());
                        }
                        else {
                            this.env.unification.Unif_Stack.pop();
                        }
                    }
                }
                ;
                pRegleLocal = null;
                Donnee1 = null;
                return unifiable;
            };
            Resolution.prototype.backTrack = function () {
                var TermRes = this.Return_Stack.getTop();
                var idPred = null;
                if (TermRes.pTerm.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) {
                    idPred = TermRes.pTerm.getAt(0).data;
                }
                if ((idPred != null) && (idPred === ("/"))) {
                    for (var i = this.Return_Stack.indexOfTop(); ((i > TermRes.index) && (i >= 0)); i--) {
                        {
                            this.Return_Stack.pop();
                            this.env.unification.Unif_Stack.pop();
                        }
                        ;
                    }
                    if (TermRes.index !== -1) {
                        TermRes = this.Return_Stack.getTop();
                        while ((this.Exec_Stack.indexOfTop() >= TermRes.indexInExecStack)) {
                            this.Exec_Stack.pop();
                        }
                        ;
                        TermRes.pos = -1;
                        this.Exec_Stack.push(this.Return_Stack.pop());
                        this.env.unification.Unif_Stack.pop();
                    }
                    else {
                        this.Exec_Stack.makeEmpty();
                    }
                }
                else {
                    if (TermRes.indexInExecStack >= 0) {
                        while ((this.Exec_Stack.indexOfTop() >= TermRes.indexInExecStack)) {
                            {
                                this.Exec_Stack.pop();
                            }
                        }
                        ;
                    }
                    this.Exec_Stack.push(this.Return_Stack.pop());
                    this.env.unification.Unif_Stack.pop();
                }
                idPred = null;
                TermRes = null;
            };
            Resolution.prototype.push_tail = function (pRegleLocal, LimitIndex, Niv, TopOfReturnStack) {
                for (var i = (pRegleLocal.size() - 1); i >= LimitIndex; i--) {
                    {
                        if ((pRegleLocal.getAt(i).getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) && (pRegleLocal.getAt(i).getAt(0).data === ("/"))) {
                            this.Exec_Stack.push(new PrologPlusCG.prolog.TermToBeResolved(pRegleLocal.getAt(i), TopOfReturnStack, 0));
                        }
                        else {
                            this.Exec_Stack.push(new PrologPlusCG.prolog.TermToBeResolved(pRegleLocal.getAt(i), Niv, 0));
                        }
                    }
                    ;
                }
            };
            Resolution.prototype.variable_goal = function (pTerme) {
                if (pTerme.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) {
                    return pTerme.getAt(0).data;
                }
                else {
                    return null;
                }
            };
            Resolution.prototype.identifierIsPredefinedGoal = function (IdPred) {
                for (var i = 0; true; i++) {
                    {
                        if (this.PredefinedGoals[i] === IdPred) {
                            return true;
                        }
                        else if (this.PredefinedGoals[i] === this.strEndOfPredefinedGoals) {
                            break;
                        }
                    }
                    ;
                }
                return false;
            };
            Resolution.prototype.theGoalBelowOnTheStackIsNot = function () {
                var bFound = false;
                if (this.Exec_Stack.size() > 1) {
                    var unTermRes = this.Exec_Stack.get(this.Exec_Stack.indexOfTop() - 1);
                    if ((unTermRes.pTerm.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) && (unTermRes.pTerm.getAt(0).data === ("not")) && (unTermRes.pos === -1)) {
                        bFound = true;
                    }
                }
                return bFound;
            };
            Resolution.prototype.ASSERT = function (cond, msg) {
                if (!cond) {
                    alert("ASSERT(false, \'" + msg + "\'");
                    throw new PrologPlusCG.prolog.ExecException(msg);
                }
            };
            Resolution.prototype.satisfyPredicateGoal = function (pTermRes, IdPred) {
                var _this = this;
                var resultat = false;
                var Arg1;
                var Arg2;
                var pRules;
                var pLstPrlg;
                var pTerme;
                if (IdPred === ("/")) {
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.indexInExecStack = this.Exec_Stack.indexOfTop();
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    resultat = true;
                }
                else if ((IdPred === ("maximalJoin")) || (IdPred === ("generalize")) || (IdPred === ("subsume"))) {
                    var G1 = void 0;
                    var G2 = void 0;
                    var G3 = null;
                    var nivG1 = 0;
                    var nivG2 = 0;
                    var C1 = null;
                    var C2 = null;
                    var DonRes = null;
                    var DonResBis = null;
                    this.ASSERT(((pTermRes.pTerm.size() === 7) || (pTermRes.pTerm.size() === 4) || ((pTermRes.pTerm.size() === 5) && (IdPred === ("subsume"))) || ((pTermRes.pTerm.size() === 3) && (IdPred === ("subsume")))), "Error: Wrong number of arguments for the CG operation.\n");
                    if ((pTermRes.pTerm.size() === 7) || (pTermRes.pTerm.size() === 5)) {
                        Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                        this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)), "Error: the first argument of the CG operation must be a CG.\n");
                        G1 = Arg1.pData.data;
                        nivG1 = Arg1.index;
                        Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                        if ((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uConcept)) {
                            C1 = Arg2.pData.data;
                        }
                        else {
                            this.ASSERT(false, "Error: The second argument of the CG operation should be a concept.\n");
                        }
                        var Arg3 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                        this.ASSERT(((Arg3.pData != null) && (Arg3.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)), "Error: the third argument of the CG operation must be a CG.\n");
                        G2 = Arg3.pData.data;
                        nivG2 = Arg3.index;
                        var Arg4 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(4), pTermRes.index);
                        if ((Arg4.pData != null) && (Arg4.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uConcept)) {
                            C2 = Arg4.pData.data;
                        }
                        else {
                            this.ASSERT(false, "Error: The fourth argument of the CG operation should be a concept.\n");
                        }
                        if (pTermRes.pTerm.size() === 7) {
                            var Arg5 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(5), pTermRes.index);
                            this.ASSERT((Arg5.pData == null), "Error: the fifth argument of the CG operation must be a free variable.\n");
                            G3 = new PrologPlusCG.cg.CG();
                            DonRes = pTermRes.pTerm.getAt(5);
                            var Arg6 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(6), pTermRes.index);
                            this.ASSERT((Arg6.pData == null), "Error: the sixth argument of the CG operation must be a free variable.\n");
                            DonResBis = pTermRes.pTerm.getAt(6);
                        }
                    }
                    else {
                        Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                        this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)), "Error: the first argument of the CG operation must be a CG.\n");
                        G1 = Arg1.pData.data;
                        nivG1 = Arg1.index;
                        Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                        this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)), "Error: the second argument of the CG operation must be a CG.\n");
                        G2 = Arg2.pData.data;
                        nivG2 = Arg2.index;
                        if (pTermRes.pTerm.size() === 4) {
                            var Arg3 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                            this.ASSERT((Arg3.pData == null), "Error: the third argument of the CG operation must be a free variable.\n");
                            G3 = new PrologPlusCG.cg.CG();
                            DonRes = pTermRes.pTerm.getAt(3);
                        }
                    }
                    var resMatchCG = new PrologPlusCG.cg.CGMatchResult(G3, null);
                    var uneOperGC = new PrologPlusCG.cg.CGOperation(this.env);
                    resultat = uneOperGC.matchCG(PrologPlusCG.cg.CGOperation.convertToByte(IdPred, G3), C1, G1, nivG1, C2, G2, nivG2, resMatchCG);
                    uneOperGC.corefMatchVec_MakeEmpty();
                    uneOperGC = null;
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    if (resultat && (DonRes != null)) {
                        var donTmp = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uCG, resMatchCG.G3);
                        resultat = this.env.unification.unify(DonRes, pTermRes.index, donTmp, pTermRes.index);
                    }
                    if (resultat && (DonResBis != null)) {
                        resultat = this.env.unification.unify(DonResBis, pTermRes.index, new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uConcept, resMatchCG.E3), pTermRes.index);
                    }
                    if (resultat) {
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                    else {
                        if (resMatchCG.G3 != null) {
                            resMatchCG.G3.myDestroy();
                        }
                        if (resMatchCG.E3 != null) {
                            resMatchCG.E3 = null;
                        }
                        this.env.unification.Unif_Stack.pop();
                    }
                    resMatchCG = null;
                }
                else if (IdPred === ("length")) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: length takes two arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: The first argument of length must be a list.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData == null) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error: The second argument of length must be an integer or a free variable.\n");
                    pLstPrlg = Arg1.pData.data;
                    var taille = 0;
                    if (pLstPrlg != null) {
                        taille = pLstPrlg.size();
                        var ValVarList = null;
                        var uneDonTmp = null;
                        var finished = false;
                        var Arg1Niv = Arg1.index;
                        while ((!finished)) {
                            {
                                try {
                                    uneDonTmp = pLstPrlg.lastElement();
                                }
                                catch (nsex) {
                                }
                                if (uneDonTmp.typeOfData === PrologPlusCG.prolog.DataTypes.uVarList) {
                                    ValVarList = this.env.unification.valueFromUnifStack(uneDonTmp, Arg1Niv);
                                    Arg1Niv = ValVarList.index;
                                    if ((ValVarList.pData != null) && (ValVarList.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uList)) {
                                        throw new PrologPlusCG.prolog.ExecException("The value of the variable after | should be a list.\n");
                                    }
                                    else if (ValVarList.pData != null) {
                                        pLstPrlg = ValVarList.pData.data;
                                        taille--;
                                        if (pLstPrlg == null) {
                                            finished = true;
                                        }
                                        else {
                                            taille = taille + pLstPrlg.size();
                                        }
                                    }
                                    else {
                                        throw new PrologPlusCG.prolog.ExecException("Warning : The length of the list can not be determined since it is partially specified; the variable after | is free.\n");
                                    }
                                }
                                else {
                                    finished = true;
                                }
                            }
                        }
                        ;
                    }
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    resultat = this.env.unification.unify(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uNumber, new Number(taille).valueOf()), pTermRes.index, pTermRes.pTerm.getAt(2), pTermRes.index);
                    if (resultat) {
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                    else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }
                else if ((IdPred === ("stringToLetters")) || (IdPred === ("identToLetters"))) {
                    var typeMot = 0;
                    if (IdPred === ("stringToLetters")) {
                        typeMot = PrologPlusCG.prolog.DataTypes.uString;
                    }
                    else {
                        typeMot = PrologPlusCG.prolog.DataTypes.uIdentifier;
                    }
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: " + IdPred + " takes two arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData == null) || (Arg1.pData.typeOfData === typeMot)), "Error: The first argument of " + IdPred + " must be a string/ident or a free variable.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData == null) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: The second argument of " + IdPred + " must be a list or a free variable.\n");
                    this.ASSERT(((Arg1.pData != null) || (Arg2.pData != null)), "Error: At least one of the two arguments of " + IdPred + " must be bound.\n");
                    if (Arg1.pData != null) {
                        var mot = Arg1.pData.data;
                        var tailleMot = mot.length;
                        var i = 0;
                        if (IdPred === ("stringToLetters")) {
                            i++;
                            tailleMot--;
                        }
                        var carToString = null;
                        pLstPrlg = new PrologPlusCG.prolog.PrologList();
                        var uneDon = void 0;
                        for (; i < tailleMot; i++) {
                            {
                                carToString = "\"" + /* valueOf */ String(mot.charAt(i)).toString() + "\"";
                                uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uString, carToString);
                                pLstPrlg.addData(uneDon);
                            }
                            ;
                        }
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, pLstPrlg);
                        resultat = this.env.unification.unify(uneDon, pTermRes.index, pTermRes.pTerm.getAt(2), pTermRes.index);
                    }
                    else {
                        pLstPrlg = Arg2.pData.data;
                        pLstPrlg = this.copyAllOfTheListWithUnification(pLstPrlg, Arg2.index);
                        var tailleVect = pLstPrlg.size();
                        var i = 0;
                        var vectCars = null;
                        if (IdPred === ("stringToLetters")) {
                            tailleVect = tailleVect + 2;
                            vectCars = (function (s) { var a = []; while (s-- > 0)
                                a.push(null); return a; })(tailleVect);
                            vectCars[0] = '\"';
                            vectCars[tailleVect - 1] = '\"';
                            i = 1;
                        }
                        else {
                            vectCars = (function (s) { var a = []; while (s-- > 0)
                                a.push(null); return a; })(tailleVect);
                        }
                        var uneDon = void 0;
                        var s = null;
                        for (var listIndex = 0; listIndex < pLstPrlg.size(); listIndex++, i++) {
                            {
                                uneDon = pLstPrlg.get(listIndex);
                                s = uneDon.data;
                                vectCars[i] = s.charAt(1);
                            }
                            ;
                        }
                        var mot = vectCars.join('');
                        uneDon = new PrologPlusCG.prolog.PrologData(typeMot, mot);
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, uneDon, pTermRes.index);
                    }
                    if (resultat) {
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                    else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }
                else if (IdPred === ("concat")) {
                    this.ASSERT((pTermRes.pTerm.size() === 4), "Error: " + IdPred + " takes three arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData == null) || (this.typeIsPrimitive(Arg1.pData.typeOfData))), "Error: The first argument of " + IdPred + " must be a number, a boolean, an identifier, a string, or a free variable.\n");
                    var nNoOfFreeArguments = 0;
                    if (Arg1.pData == null) {
                        nNoOfFreeArguments++;
                    }
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData == null) || (this.typeIsPrimitive(Arg2.pData.typeOfData))), "Error: The second argument of " + IdPred + " must be a number, a boolean, an identifier, a string, or a free variable.\n");
                    if (Arg2.pData == null) {
                        nNoOfFreeArguments++;
                    }
                    var Arg3 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                    this.ASSERT(((Arg3.pData == null) || (Arg3.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString)), "Error: The third argument of " + IdPred + " must be a string or a free variable.\n");
                    if (Arg3.pData == null) {
                        nNoOfFreeArguments++;
                    }
                    this.ASSERT((nNoOfFreeArguments === 1) || (nNoOfFreeArguments === 0), "Error: " + IdPred + " must have either two or three bound arguments.\n");
                    if (Arg3.pData == null || nNoOfFreeArguments === 0) {
                        var s1 = this.primitiveTypeToString(Arg1.pData);
                        var s2 = this.primitiveTypeToString(Arg2.pData);
                        var s3 = "\"" + s1.substring(1, s1.length - 1) + s2.substring(1, s2.length - 1) + "\"";
                        var uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uString, s3);
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        resultat = this.env.unification.unify(uneDon, pTermRes.index, pTermRes.pTerm.getAt(3), pTermRes.index);
                    }
                    else if (Arg2.pData == null) {
                        var s1 = this.primitiveTypeToString(Arg1.pData);
                        var s3 = this.primitiveTypeToString(Arg3.pData);
                        var s1stripped = s1.substring(1, s1.length - 1);
                        var s3stripped = s3.substring(1, s3.length - 1);
                        resultat = /* startsWith */ (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(s3stripped, s1stripped);
                        if (!resultat) {
                            this.env.unification.Unif_Stack.pushEmptyRecord();
                        }
                        else {
                            var s1strippedLength = s1stripped.length;
                            var s2 = "\"" + s3stripped.substring(s1strippedLength, s3stripped.length) + "\"";
                            var uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uString, s2);
                            this.env.unification.Unif_Stack.pushEmptyRecord();
                            resultat = this.env.unification.unify(uneDon, pTermRes.index, pTermRes.pTerm.getAt(2), pTermRes.index);
                        }
                    }
                    else {
                        var s2 = this.primitiveTypeToString(Arg2.pData);
                        var s3 = this.primitiveTypeToString(Arg3.pData);
                        var s2stripped = s2.substring(1, s2.length - 1);
                        var s3stripped = s3.substring(1, s3.length - 1);
                        resultat = /* endsWith */ (function (str, searchString) { var pos = str.length - searchString.length; var lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(s3stripped, s2stripped);
                        if (!resultat) {
                            this.env.unification.Unif_Stack.pushEmptyRecord();
                        }
                        else {
                            var s2strippedLength = s2stripped.length;
                            var s1 = "\"" + s3stripped.substring(0, s3stripped.length - s2strippedLength) + "\"";
                            var uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uString, s1);
                            this.env.unification.Unif_Stack.pushEmptyRecord();
                            resultat = this.env.unification.unify(uneDon, pTermRes.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                        }
                    }
                    if (resultat) {
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                    else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }
                else if (IdPred === ("external")) {
                    resultat = true;
                    this.ASSERT((pTermRes.pTerm.size() === 4), "Error: " + IdPred + " takes three arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(Arg1.pData != null && Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString, "Error: The first argument of " + IdPred + " must be a string.\n");
                    var nNoOfFreeArguments = 0;
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: The second argument of " + IdPred + " must be a list.\n");
                    var Arg3 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                    this.ASSERT(((Arg3.pData == null) || (Arg3.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString)), "Error: The third argument of " + IdPred + " must be a string or a free variable.\n");
                    if (Arg3.pData == null) {
                        nNoOfFreeArguments++;
                    }
                    this.ASSERT((nNoOfFreeArguments === 1) || (nNoOfFreeArguments === 0), "Error: " + IdPred + " must have either two or three bound arguments.\n");
                    var functionName = Arg1.pData.valString();
                    if (functionName.length > 2) {
                        functionName = functionName.substring(1, functionName.length - 1);
                    }
                    var myFunc = (window[functionName]);
                    var params = ([]);
                    var pLstPrlg1 = Arg2.pData.data;
                    pLstPrlg1 = this.copyAllOfTheListWithUnification(pLstPrlg1, Arg2.index);
                    for (var listIndex = 0; listIndex < pLstPrlg1.size(); ++listIndex) {
                        {
                            var obj = pLstPrlg1.get(listIndex).data;
                            /* add */ (params.push(obj) > 0);
                        }
                        ;
                    }
                    var result = null;
                    try {
                        result = myFunc.apply(window, params);
                    }
                    catch (e) {
                        var strMessage = "Could not call function: " + functionName + "\nException = " + e.message;
                        this.env.recordErrorMessage(strMessage);
                        console.log("UP210.6.5: " + strMessage);
                        resultat = false;
                    }
                    if (resultat) {
                        var uneDon = null;
                        if (typeof result === 'string') {
                            uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uString, result);
                        }
                        else if (typeof result === 'number') {
                            uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uNumber, result);
                        }
                        else if (typeof result === 'number') {
                            uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uNumber, result);
                        }
                        else {
                            uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uString, result.toString());
                        }
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        resultat = this.env.unification.unify(uneDon, pTermRes.index, pTermRes.pTerm.getAt(3), pTermRes.index);
                    }
                    if (resultat) {
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                    else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }
                else if (IdPred === ("branchOfCG")) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: branchOfCG takes two arguments.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)), "Error: The second argument of branchOfCG must be a CG.\n");
                    var unGC = Arg2.pData.data;
                    var vctRels = unGC.m_vctRelations;
                    var nbreBranch = vctRels.length;
                    while (((pTermRes.pos < nbreBranch) && !resultat)) {
                        {
                            this.env.unification.Unif_Stack.pushEmptyRecord();
                            var unGCBranch = this.createCGBranch(vctRels[pTermRes.pos]);
                            resultat = this.env.unification.unify(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uCG, unGCBranch), Arg2.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                            pTermRes.pos++;
                            if (resultat) {
                                this.Return_Stack.push(this.Exec_Stack.pop());
                            }
                            else {
                                this.env.unification.Unif_Stack.pop();
                            }
                        }
                    }
                    ;
                }
                else if (IdPred === ("concOfCG")) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: concOfCG takes two arguments.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)), "Error: The second argument of concOfCG must be a CG.\n");
                    var unGC = Arg2.pData.data;
                    var vctConcepts = unGC.m_vctConcepts;
                    var nbreConcs = vctConcepts.length;
                    resultat = false;
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    while (((pTermRes.pos < nbreConcs) && !resultat)) {
                        {
                            this.env.unification.Unif_Stack.pushEmptyRecord();
                            var concCour = vctConcepts[pTermRes.pos];
                            if (Arg1.pData == null) {
                                resultat = this.env.unification.unify(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uConcept, concCour), Arg2.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                            }
                            else {
                                var gTmp = new PrologPlusCG.cg.CG();
                                gTmp.addConcept(concCour);
                                resultat = this.env.unification.unify(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uCG, gTmp), Arg2.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                            }
                            pTermRes.pos++;
                            if (resultat) {
                                this.Return_Stack.push(this.Exec_Stack.pop());
                            }
                            else {
                                this.env.unification.Unif_Stack.pop();
                            }
                        }
                    }
                    ;
                }
                else if (IdPred === ("member")) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: member takes two arguments.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: The second argument of member must be a list.\n");
                    pLstPrlg = Arg2.pData.data;
                    pTermRes.lstMember = null;
                    pTermRes.indLstMember = 0;
                    var Arg2Niv = Arg2.index;
                    var dernierInd = pLstPrlg.size() - 1;
                    var finished = false;
                    while ((!finished && !resultat)) {
                        {
                            while (((pTermRes.pos < dernierInd) && !resultat)) {
                                {
                                    this.env.unification.Unif_Stack.pushEmptyRecord();
                                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, pLstPrlg.getAt(pTermRes.pos), Arg2Niv);
                                    pTermRes.pos++;
                                    if (resultat) {
                                        this.Return_Stack.push(this.Exec_Stack.pop());
                                    }
                                    else {
                                        this.env.unification.Unif_Stack.pop();
                                    }
                                }
                            }
                            ;
                            if (!resultat && (pTermRes.pos === dernierInd)) {
                                if (pLstPrlg.getAt(dernierInd).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList) {
                                    var contr = this.env.unification.valueFromUnifStack(pLstPrlg.getAt(dernierInd), Arg2Niv);
                                    this.ASSERT((contr.pData != null) && (contr.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList), "Error: The second argument of member should be a list.\n");
                                    pLstPrlg = contr.pData.data;
                                    Arg2Niv = contr.index;
                                    pTermRes.lstMember = pLstPrlg;
                                    pTermRes.indLstMember = contr.index;
                                    dernierInd = pLstPrlg.size() - 1;
                                    pTermRes.pos = 0;
                                }
                                else {
                                    this.env.unification.Unif_Stack.pushEmptyRecord();
                                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, pLstPrlg.getAt(dernierInd), Arg2Niv);
                                    pTermRes.pos++;
                                    if (resultat) {
                                        this.Return_Stack.push(this.Exec_Stack.pop());
                                    }
                                    else {
                                        this.env.unification.Unif_Stack.pop();
                                    }
                                    finished = true;
                                }
                            }
                            else {
                                finished = true;
                            }
                        }
                    }
                    ;
                    if (!resultat) {
                        pTermRes.lstMember = null;
                        pTermRes.indLstMember = 0;
                        pTermRes.pos = 0;
                    }
                }
                else if (IdPred === ("not")) {
                    this.ASSERT((pTermRes.pTerm.size() === 2), "Error: not takes one argument.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData != null) && ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG))), "Error: The not argument must be a term or a CG.\n");
                    pTermRes.pos = -1;
                    pTermRes.indexInExecStack = this.Return_Stack.indexOfTop();
                    var aTrmtmp = null;
                    if ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)) {
                        aTrmtmp = new PrologPlusCG.prolog.PrologTerm();
                        aTrmtmp.addData(Arg1.pData);
                    }
                    else {
                        aTrmtmp = Arg1.pData.data;
                    }
                    this.Exec_Stack.push(new PrologPlusCG.prolog.TermToBeResolved(aTrmtmp, Arg1.index, 0));
                    resultat = true;
                }
                else if (IdPred === ("findall")) {
                    this.ASSERT((pTermRes.pTerm.size() === 4), "Error: findall takes three arguments.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData != null) && ((Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG))), "Error: The second argument of findall must be a term or a CG.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData == null) && ((pTermRes.pTerm.getAt(1).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (pTermRes.pTerm.getAt(1).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList)) && this.isVariableGoal(pTermRes.pTerm.getAt(1).data, Arg2.pData)), "Error: The first argument of findall must be a free variable that is contained in the second argument.\n");
                    var Arg3 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                    this.ASSERT((Arg3.pData == null) && ((pTermRes.pTerm.getAt(3).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (pTermRes.pTerm.getAt(3).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList)), "Error: the third argument of findall must be a free variable.\n");
                    pTermRes.pos = -1;
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pLstPrlg = new PrologPlusCG.prolog.PrologList();
                    var nouvDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, pLstPrlg);
                    this.env.unification.unify(pTermRes.pTerm.getAt(3), pTermRes.index, nouvDon, pTermRes.index);
                    pTermRes.lstMember = pLstPrlg;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    var aTrmTmp = new PrologPlusCG.prolog.PrologTerm();
                    nouvDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, "fail");
                    aTrmTmp.addData(nouvDon);
                    nouvDon = null;
                    this.Exec_Stack.push(new PrologPlusCG.prolog.TermToBeResolved(aTrmTmp, pTermRes.index, 0));
                    aTrmTmp = new PrologPlusCG.prolog.PrologTerm();
                    aTrmTmp.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, "addElemForAll"));
                    aTrmTmp.addData(pTermRes.pTerm.getAt(1));
                    aTrmTmp.addData(pTermRes.pTerm.getAt(3));
                    this.Exec_Stack.push(new PrologPlusCG.prolog.TermToBeResolved(aTrmTmp, pTermRes.index, 0));
                    if (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) {
                        aTrmTmp = new PrologPlusCG.prolog.PrologTerm();
                        aTrmTmp.addData(Arg2.pData);
                    }
                    else {
                        aTrmTmp = Arg2.pData.data;
                    }
                    this.Exec_Stack.push(new PrologPlusCG.prolog.TermToBeResolved(aTrmTmp, Arg2.index, 0));
                    aTrmTmp = null;
                    resultat = true;
                }
                else if (IdPred === ("set_list")) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: set_list takes two arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData == null) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uSet)), "Error: the first argument of set_list must be a free variable or a set.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData == null) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: the second argument of set_list must be a free variable or a list.\n");
                    this.ASSERT(((Arg1.pData != null) || (Arg2.pData != null)), "Error: the two arguments of set_list can not be two free variables.\n");
                    if (Arg1.pData == null) {
                        pLstPrlg = Arg2.pData.data;
                        pLstPrlg = this.copyAllOfTheListWithUnification(pLstPrlg, Arg2.index);
                        var uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uSet, pLstPrlg);
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, uneDon, pTermRes.index);
                    }
                    else {
                        var uneDon = Arg1.pData.myCopy();
                        uneDon.typeOfData = PrologPlusCG.prolog.DataTypes.uList;
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        resultat = this.env.unification.unify(uneDon, pTermRes.index, pTermRes.pTerm.getAt(2), pTermRes.index);
                    }
                    if (resultat) {
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                    else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }
                else if (IdPred === ("shuffle")) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: shuffle takes two arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList), "Error: the first argument of shuffle must be a list.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT((Arg2.pData == null), "Error: the second argument of shuffle must be a free variable.\n");
                    pLstPrlg = Arg1.pData.data;
                    pLstPrlg = this.copyAllOfTheListWithUnification(pLstPrlg, Arg1.index);
                    pLstPrlg.shuffle$();
                    var uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, pLstPrlg);
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(2), pTermRes.index, uneDon, pTermRes.index);
                    if (resultat) {
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                    else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }
                else if (IdPred === ("term_list")) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: term_list takes two arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData == null) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm)), "Error: the first argument of term_list must be a free variable or a term.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData == null) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: the second argument of term_list must be a free variable or a list.\n");
                    this.ASSERT(((Arg1.pData != null) || (Arg2.pData != null)), "Error: the two arguments of term_list can not be two free variables.\n");
                    if (Arg1.pData == null) {
                        pLstPrlg = Arg2.pData.data;
                        this.ASSERT((pLstPrlg.size() !== 0), "Error: the second argument of term_list can not be an empty list.\n");
                        var ArgTmp = this.env.unification.valueFromUnifStack(pLstPrlg.elementAt(0), Arg2.index);
                        this.ASSERT(((ArgTmp.pData != null) && (ArgTmp.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error: the first element of the list (the second argument of term_list) must be an identifier.\n");
                        pTerme = new PrologPlusCG.prolog.PrologTerm();
                        var uneDon = void 0;
                        for (var listIndex = 0; listIndex < pLstPrlg.size(); ++listIndex) {
                            {
                                uneDon = pLstPrlg.get(listIndex);
                                pTerme.addData(uneDon);
                            }
                            ;
                        }
                        pTerme.set(0, ArgTmp.pData);
                        ArgTmp = null;
                        uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, pTerme);
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, uneDon, pTermRes.index);
                    }
                    else {
                        pTerme = Arg1.pData.data;
                        pLstPrlg = new PrologPlusCG.prolog.PrologList();
                        var uneDon = null;
                        for (var listIndex = 0; listIndex < pTerme.size(); ++listIndex) {
                            {
                                uneDon = pTerme.get(listIndex);
                                pLstPrlg.addData(uneDon);
                            }
                            ;
                        }
                        uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, pLstPrlg);
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        resultat = this.env.unification.unify(uneDon, pTermRes.index, pTermRes.pTerm.getAt(2), pTermRes.index);
                    }
                    if (resultat) {
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                    else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }
                else if ((IdPred === ("read")) || (IdPred === ("read_sentence"))) {
                    this.ASSERT(!this.env.bIsApplet, "Cannot use the \'read\' or \'read_sentence\' predicates in an applet!");
                    if (IdPred === ("read")) {
                        this.ASSERT((pTermRes.pTerm.size() === 2), "Error: read takes one argument.\n");
                    }
                    else {
                        this.ASSERT(((pTermRes.pTerm.size() === 2) || (pTermRes.pTerm.size() === 3)), "Error: read_sentence takes one or two arguments.\n");
                    }
                    var modeLecture = 0;
                    if (pTermRes.pTerm.size() === 2) {
                        Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                        this.ASSERT(((Arg1.pData == null) && ((pTermRes.pTerm.getAt(1).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (pTermRes.pTerm.getAt(1).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList))), "Error: the read and read_sentence/1 argument must be a free variable.\n");
                        if (IdPred === ("read")) {
                            modeLecture = PrologPlusCG.prolog.DataTypes.uReadData;
                        }
                        else {
                            modeLecture = PrologPlusCG.prolog.DataTypes.uReadSentence;
                        }
                        this.env.io.appendToConsole("|: ");
                        this.env.io.readSomething(modeLecture);
                    }
                    else {
                        modeLecture = PrologPlusCG.prolog.DataTypes.uReadSentence;
                        Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                        this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString)), "Error: The first argument of read_sentence/2 must be a String.\n");
                        Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                        this.ASSERT(((Arg2.pData == null) && ((pTermRes.pTerm.getAt(2).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (pTermRes.pTerm.getAt(2).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList))), "Error: The second argument of read_sentence/2 must be a free variable.\n");
                        try {
                            var sTmp = Arg1.pData.data;
                            this.env.compile.CompileTxt = sTmp.substring(1, sTmp.length - 1);
                            this.env.compile.textEndIndex = this.env.compile.CompileTxt.length;
                            this.env.compile.curCharIndex = 0;
                            this.env.compile.readChar();
                            /* clear */ (this.env.compile.vctUnitTyp.length = 0);
                            this.env.compile.tSentence();
                        }
                        catch (e1) {
                            if (!(e1.message === ("End Of Text")) || /* isEmpty */ (this.env.compile.vctUnitTyp.length == 0)) {
                                this.env.io.appendToConsole("\n Error in the given string.");
                                /* clear */ (this.env.compile.vctUnitTyp.length = 0);
                            }
                        }
                    }
                    if (!(this.env.compile.vctUnitTyp.length == 0) && (modeLecture === PrologPlusCG.prolog.DataTypes.uReadData)) {
                        var trmTmp = new PrologPlusCG.prolog.PrologTerm();
                        try {
                            this.env.compile.currElem = 0;
                            this.env.compile.tPrologData(true, trmTmp);
                        }
                        catch (ce) {
                        }
                        var donIn = trmTmp.getAt(0);
                        trmTmp.clear();
                        trmTmp = null;
                        /* clear */ (this.env.compile.vctUnitTyp.length = 0);
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        resultat = this.env.unification.unify(donIn, pTermRes.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                        if (resultat) {
                            pTermRes.pos = -1;
                            this.Return_Stack.push(this.Exec_Stack.pop());
                        }
                        else {
                            this.env.unification.Unif_Stack.pop();
                        }
                    }
                    else if (!(this.env.compile.vctUnitTyp.length == 0) && (modeLecture === PrologPlusCG.prolog.DataTypes.uReadSentence)) {
                        var LstPrlg = new PrologPlusCG.prolog.PrologList();
                        var unitTyp = null;
                        var sTmp = null;
                        for (var listIndex = 0; listIndex < /* size */ this.env.compile.vctUnitTyp.length; ++listIndex) {
                            {
                                unitTyp = /* get */ this.env.compile.vctUnitTyp[listIndex];
                                sTmp = '\"' + /* toString */ unitTyp.unit.str + '\"';
                                LstPrlg.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uString, sTmp));
                            }
                            ;
                        }
                        /* clear */ (this.env.compile.vctUnitTyp.length = 0);
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        var donTmp = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, LstPrlg);
                        var indArg = 0;
                        if (pTermRes.pTerm.size() === 2) {
                            indArg = 1;
                        }
                        else {
                            indArg = 2;
                        }
                        resultat = this.env.unification.unify(donTmp, pTermRes.index, pTermRes.pTerm.getAt(indArg), pTermRes.index);
                        donTmp = null;
                        if (resultat) {
                            pTermRes.pos = -1;
                            this.Return_Stack.push(this.Exec_Stack.pop());
                        }
                        else {
                            this.env.unification.Unif_Stack.pop();
                        }
                    }
                    else {
                        throw new PrologPlusCG.prolog.ExecException("Error while reading data.");
                    }
                }
                else if (IdPred === ("addElemForAll")) {
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    pLstPrlg = Arg2.pData.data;
                    if ((pLstPrlg.size() === 0) || (Arg1.pData !== pLstPrlg.lastElement())) {
                        pLstPrlg.addData(Arg1.pData);
                    }
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    resultat = true;
                }
                else if (IdPred === ("write")) {
                    this.ASSERT((pTermRes.pTerm.size() === 2), "Error: write takes one argument.\n");
                    this.env.printer.indVar = 0;
                    this.env.printer.printPrologData(pTermRes.pTerm.getAt(1), pTermRes.index, true);
                    this.env.printer.flush();
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    resultat = true;
                }
                else if (IdPred === ("writenl")) {
                    this.ASSERT((pTermRes.pTerm.size() === 2), "Error: writenl takes one argument.\n");
                    this.env.printer.indVar = 0;
                    this.env.printer.printPrologData(pTermRes.pTerm.getAt(1), pTermRes.index, true);
                    this.env.printer.flush();
                    this.env.io.appendToConsole("\n");
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    resultat = true;
                }
                else if (IdPred === ("clearConsole")) {
                    this.ASSERT((pTermRes.pTerm.size() === 1), "Error: clearConsole takes no arguments.\n");
                    this.env.io.clearConsole();
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    resultat = true;
                }
                else if (IdPred === ("nl")) {
                    this.ASSERT((pTermRes.pTerm.size() === 1), "Error: nl takes no arguments.\n");
                    this.env.io.appendToConsole("\n");
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    resultat = true;
                }
                else if (IdPred === ("destroyAll")) {
                    this.ASSERT((pTermRes.pTerm.size() === 1), "Error: destroyAll has no argument.\n");
                    this.clear_globalPrlgPCGObjs();
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    resultat = true;
                }
                else if (IdPred === ("destroy")) {
                    this.ASSERT((pTermRes.pTerm.size() === 2), "Error: destroy takes one argument.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error: the first argument of destroy must be an identifier.\n");
                    var IdObj_1 = Arg1.pData.data;
                    this.ASSERT(( /* get */(function (m, k) { return m[k] === undefined ? null : m[k]; })(this.globalPrlgPCGObjs, IdObj_1) != null), "Error : Object unknown.");
                    /* remove */ (function (map) { var deleted = _this.globalPrlgPCGObjs[IdObj_1]; delete _this.globalPrlgPCGObjs[IdObj_1]; return deleted; })(this.globalPrlgPCGObjs);
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    resultat = true;
                }
                else if (IdPred === ("objectify")) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: objectify takes two arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uObject)), "Error: the first argument of objectify must be an object.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error: the second argument of objectify must be an identifier.\n");
                    var IdObj = Arg2.pData.data;
                    this.ASSERT(( /* get */(function (m, k) { return m[k] === undefined ? null : m[k]; })(this.globalPrlgPCGObjs, IdObj) == null), "Error : Object already exists.");
                    /* put */ (this.globalPrlgPCGObjs[IdObj] = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uObject, Arg1.pData.data));
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    resultat = true;
                }
                else if (IdPred === ("createInstance")) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: createInstance takes two arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData != null) && ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString))), "Error: the first argument of createInstance must be an identifier.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm)), "Error: the second argument of createInstance must be a term.\n");
                    if (this.env.program == null) {
                        this.env.io.showMessageDialog("No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, retract and suppress) can be satisfied.", "Warning");
                        this.Return_Stack.makeEmpty();
                        return resultat;
                    }
                    var pRegle = new PrologPlusCG.prolog.PrologRule();
                    var aCple = new PrologPlusCG.prolog.PrologTerm();
                    var uneDonId = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, this.env.compile.valSysCleBtCp);
                    aCple.addData(uneDonId);
                    var aTerm1 = new PrologPlusCG.prolog.PrologTerm();
                    aTerm1.addData(Arg1.pData);
                    var ClePaquet = this.env.compile.valSysGEN + this.env.compile.nameOfArgument(aTerm1, -1);
                    aCple.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, aTerm1));
                    var uneDonVr = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uVariable, this.env.compile.valSysIdVar);
                    aCple.addData(uneDonVr);
                    pRegle.addTerm(aCple);
                    aCple = new PrologPlusCG.prolog.PrologTerm();
                    aCple.addData(uneDonId);
                    aCple.addData(Arg2.pData);
                    aCple.addData(uneDonVr);
                    pRegle.addTerm(aCple);
                    pRules = (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.env.program, ClePaquet);
                    if (pRules != null) {
                        pRules.addRule(pRegle);
                    }
                    else {
                        pRules = new PrologPlusCG.prolog.RuleVector();
                        pRules.addRule(pRegle);
                        /* put */ (this.env.program[ClePaquet] = pRules);
                    }
                    this.programModified = true;
                    pRules = null;
                    ClePaquet = null;
                    pRegle = null;
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    resultat = true;
                }
                else if ((IdPred === ("asserta")) || (IdPred === ("assertz"))) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: asserta/z takes two arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(Arg1.pData != null, "Error: the first argument of asserta/z must be bound.\n");
                    if ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)) {
                        var unTrm_1 = new PrologPlusCG.prolog.PrologTerm();
                        unTrm_1.addData(Arg1.pData);
                        Arg1.pData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, unTrm_1);
                    }
                    else {
                        this.ASSERT(Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm, "Error: the first argument of asserta/z must be a term or a CG.\n");
                    }
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: the second argument of asserta/z must be a list.\n");
                    if (this.env.program == null) {
                        var strMessage = "No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, retract and suppress) can be satisfied.";
                        if (!this.env.bIsApplet) {
                            this.env.io.showMessageDialog(strMessage, "Warning");
                        }
                        else {
                            this.env.recordErrorMessage(strMessage);
                        }
                        this.Return_Stack.makeEmpty();
                        return false;
                    }
                    var pRule = new PrologPlusCG.prolog.PrologRule();
                    pRule.addTerm(this.assertTerm(Arg1.pData.data, Arg1.index));
                    pLstPrlg = Arg2.pData.data;
                    var uneDon = void 0;
                    var unTrm = void 0;
                    for (var listIndex = 0; listIndex < pLstPrlg.size(); ++listIndex) {
                        {
                            uneDon = pLstPrlg.get(listIndex);
                            if ((uneDon.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (uneDon.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) || (uneDon.typeOfData === PrologPlusCG.prolog.DataTypes.uVariable)) {
                                unTrm = new PrologPlusCG.prolog.PrologTerm();
                                unTrm.addData(uneDon);
                                pRule.addTerm(this.assertTerm(unTrm, Arg2.index));
                            }
                            else {
                                this.ASSERT((uneDon.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm), "Error: the second argument of asserta/z must be a list of terms or CG.\n");
                                pRule.addTerm(this.assertTerm(uneDon.data, Arg2.index));
                            }
                        }
                        ;
                    }
                    pLstPrlg = null;
                    uneDon = null;
                    var ClePaquet = this.env.compile.nameOfArgument(pRule.getAt(0), Arg1.index);
                    pRules = (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.env.program, ClePaquet);
                    if (pRules != null) {
                        if (IdPred === ("asserta")) {
                            try {
                                pRules.add(0, pRule);
                            }
                            catch (exp) {
                            }
                        }
                        else {
                            pRules.addRule(pRule);
                        }
                    }
                    else {
                        pRules = new PrologPlusCG.prolog.RuleVector();
                        pRules.addRule(pRule);
                        /* put */ (this.env.program[ClePaquet] = pRules);
                    }
                    this.programModified = true;
                    pRules = null;
                    ClePaquet = null;
                    pRule = null;
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    resultat = true;
                }
                else if (IdPred === ("retract")) {
                    this.ASSERT((pTermRes.pTerm.size() === 2), "Error: retract takes one argument.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(Arg1.pData != null, "Error: the argument of retract must be bound.\n");
                    if ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)) {
                        var unTrm = new PrologPlusCG.prolog.PrologTerm();
                        unTrm.addData(Arg1.pData);
                        Arg1.pData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, unTrm);
                    }
                    else {
                        this.ASSERT((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm), "Error: the argument of retract must be a term.\n");
                    }
                    var IdCle_1 = this.env.compile.nameOfArgument(Arg1.pData.data, Arg1.index);
                    if (this.env.program == null) {
                        this.env.io.showMessageDialog("No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, retract and suppress) can be satisfied.", "Warning");
                        this.Return_Stack.makeEmpty();
                        return resultat;
                    }
                    pRules = (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.env.program, IdCle_1);
                    if (pRules != null) {
                        var Donnee2 = void 0;
                        var uneRegle = void 0;
                        var indRegle = 0;
                        for (var listIndex = 0; listIndex < pRules.size() && !resultat; ++listIndex) {
                            {
                                uneRegle = pRules.get(listIndex);
                                this.env.unification.Unif_Stack.pushEmptyRecord();
                                var TopOfUnification_Stack = this.env.unification.Unif_Stack.indexOfTop();
                                Donnee2 = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, uneRegle.getAt(0));
                                resultat = this.env.unification.unify(Donnee2, TopOfUnification_Stack, Arg1.pData, Arg1.index);
                                if (resultat) {
                                    pTermRes.pos = -1;
                                    this.Return_Stack.push(this.Exec_Stack.pop());
                                    uneRegle.myDestroy();
                                    uneRegle = null;
                                    pRules.remove(indRegle);
                                    if (pRules.isEmpty()) {
                                        /* remove */ (function (map) { var deleted = _this.env.program[IdCle_1]; delete _this.env.program[IdCle_1]; return deleted; })(this.env.program);
                                    }
                                    this.programModified = true;
                                }
                                else {
                                    this.env.unification.Unif_Stack.pop();
                                    indRegle++;
                                }
                            }
                            ;
                        }
                        Donnee2 = null;
                        uneRegle = null;
                    }
                    else {
                        resultat = false;
                    }
                    IdCle_1 = null;
                }
                else if (IdPred === ("suppress")) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: suppress takes two arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error: the first argument of suppress must be an identifier.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error: the second argument of suppress must be an integer.\n");
                    if (this.env.program == null) {
                        this.env.io.showMessageDialog("No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, retract and suppress) can be satisfied.", "Warning");
                        this.Return_Stack.makeEmpty();
                        return resultat;
                    }
                    var Strg_1 = this.env.compile.getTermSlashNumberOfArgumentsString(Arg1.pData.data, /* intValue */ (Arg2.pData.data | 0));
                    pRules = (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.env.program, Strg_1);
                    var uneRegle = void 0;
                    if (pRules != null) {
                        for (var listIndex = 0; listIndex < pRules.size(); ++listIndex) {
                            {
                                uneRegle = pRules.get(listIndex);
                                uneRegle.myDestroy();
                                uneRegle = null;
                            }
                            ;
                        }
                        pRules.clear();
                        /* remove */ (function (map) { var deleted = _this.env.program[Strg_1]; delete _this.env.program[Strg_1]; return deleted; })(this.env.program);
                        this.programModified = true;
                        resultat = true;
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                }
                else if (IdPred === ("isInstance")) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: instance takes two arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData != null) && ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString))), "Error : the first argument of isInstance should be an identifier or a string.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error : the second argument of isInstance should be an identifier.\n");
                    try {
                        var aUnifyCG = new PrologPlusCG.prolog.UnifyCG(this.env);
                        resultat = aUnifyCG.conform(pTermRes.pTerm.getAt(1), pTermRes.index, Arg2.pData.data);
                    }
                    catch (exex) {
                        resultat = false;
                    }
                    if (resultat) {
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                }
                else if (IdPred === ("addInstance")) {
                    if (this.env.typeHierarchy == null) {
                        throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified.");
                    }
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: addInstance takes two arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData != null) && ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString))), "Error : the first argument of addInstance should be an identifier or a string.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error : the second argument of addInstance should be an identifier.\n");
                    this.env.typeHierarchy.addInstance(Arg1.pData.data, Arg2.pData.data);
                    resultat = true;
                    this.programModified = true;
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                }
                else if (IdPred === ("free")) {
                    this.ASSERT((pTermRes.pTerm.size() === 2), "Error: free takes one argument.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    resultat = (Arg1.pData == null);
                    if (resultat) {
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                }
                else if (IdPred === ("val")) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: val takes two arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData == null) || (pTermRes.pTerm.getAt(1).typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error: the first argument of val must be a free variable or an object identifier.\n");
                    var donTmp = null;
                    if (pTermRes.pTerm.getAt(2).typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) {
                        var IdObj = pTermRes.pTerm.getAt(2).data;
                        donTmp = (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.globalPrlgPCGObjs, IdObj);
                        this.ASSERT((donTmp != null), "Error : The object " + IdObj + " is unknown.\n");
                    }
                    else {
                        donTmp = this.evalExpr(pTermRes.pTerm.getAt(2), pTermRes.index);
                    }
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    if (pTermRes.pTerm.getAt(1).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) {
                        resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, donTmp, pTermRes.index);
                    }
                    else {
                        var IdObj = pTermRes.pTerm.getAt(1).data;
                        /* put */ (this.globalPrlgPCGObjs[IdObj] = donTmp);
                        resultat = true;
                    }
                    this.ASSERT((resultat === true), "Error: the two arguments of val should be unified");
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                }
                else if ((IdPred === ("sup")) || (IdPred === ("inf")) || (IdPred === ("eqv"))) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: " + IdPred + " takes two arguments.\n");
                    var uneDonTrans1 = this.evalExpr(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((uneDonTrans1 != null) && (uneDonTrans1.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error : the expression should return a number.");
                    var val1 = uneDonTrans1.data;
                    var uneDonTrans2 = this.evalExpr(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((uneDonTrans2 != null) && (uneDonTrans2.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error : the expression should return a number.");
                    var val2 = uneDonTrans2.data;
                    if (IdPred === ("sup")) {
                        resultat = /* doubleValue */ val1 > /* doubleValue */ val2;
                    }
                    else if (IdPred === ("inf")) {
                        resultat = /* doubleValue */ val1 < /* doubleValue */ val2;
                    }
                    else if (IdPred === ("eqv")) {
                        resultat = /* doubleValue */ val1 === /* doubleValue */ val2;
                    }
                    if (resultat) {
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                }
                else if (IdPred === ("seed")) {
                    this.ASSERT((pTermRes.pTerm.size() === 2), "Error: " + IdPred + " takes one argument.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error: the argument of  " + IdPred + " must be a number between 0 and 2,100,000,000.\n");
                    var val1 = Arg1.pData.data;
                    var val1Long = val1;
                    this.ASSERT(val1Long >= 0 && val1Long <= 2100000000, "Error: the argument of  " + IdPred + " must be a number between 0 and 2,100,000,000.\n");
                    this.rndRandom.setSeed(val1Long);
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    resultat = true;
                }
                else if (IdPred === ("rnd")) {
                    this.ASSERT((pTermRes.pTerm.size() === 4), "Error: " + IdPred + " takes three arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error: the first argument of  " + IdPred + " must be a number between 0 and 2,100,000,000.\n");
                    var val1 = Arg1.pData.data;
                    var val1Long = val1;
                    this.ASSERT(val1Long >= 0 && val1Long <= 2100000000, "Error: the first argument of  " + IdPred + " must be a number between 0 and 2,100,000,000.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error: the second argument of  " + IdPred + " must be a number between 0 and 2,100,000,000.\n");
                    var val2 = Arg2.pData.data;
                    var val2Long = val2;
                    this.ASSERT(val2Long >= 0 && val2Long <= 2100000000, "Error: the second argument of  " + IdPred + " must be a number between 0 and 2,100,000,000.\n");
                    this.ASSERT(val1Long <= val2Long, "Error: the first argument of  " + IdPred + " must be less than or equal to the second argument.\n");
                    var Arg3 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                    this.ASSERT(Arg3.pData == null, "Error: the third argument of  " + IdPred + " must be a free variable.\n");
                    var randomDouble = this.rndRandom.nextDouble();
                    var myDifference = val2Long - val1Long;
                    var mySolutionDouble = (myDifference * randomDouble) + val1Long;
                    var mySolutionDoubleObject = new Number(mySolutionDouble).valueOf();
                    var mySolutionAtomicDouble = Math.floor(/* doubleValue */ mySolutionDoubleObject);
                    var mySolutionLong = new Number((function (n) { return n < 0 ? Math.ceil(n) : Math.floor(n); })(mySolutionAtomicDouble)).valueOf();
                    var aPrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uNumber, mySolutionLong);
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    resultat = this.env.unification.unify(aPrologData, pTermRes.index, pTermRes.pTerm.getAt(3), pTermRes.index);
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    resultat = true;
                }
                else if (IdPred === ("eq")) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: eq takes two arguments.\n");
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    if ((Arg1.pData != null) && ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uConcept)) && (Arg2.pData != null) && ((Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uConcept))) {
                        resultat = this.env.unification.unify(pTermRes.pTerm.getAt(2), pTermRes.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                    }
                    else {
                        resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, pTermRes.pTerm.getAt(2), pTermRes.index);
                    }
                    if (resultat) {
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                    else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }
                else if (IdPred === ("dif")) {
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: dif takes two arguments.\n");
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    if ((Arg1.pData != null) && ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uConcept)) && (Arg2.pData != null) && ((Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uConcept))) {
                        resultat = this.env.unification.unify(pTermRes.pTerm.getAt(2), pTermRes.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                    }
                    else {
                        resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, pTermRes.pTerm.getAt(2), pTermRes.index);
                    }
                    resultat = !resultat;
                    if (resultat) {
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                    else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }
                else if (IdPred === ("fail")) {
                    resultat = false;
                }
                else if ((IdPred === ("isSubType")) || (IdPred === ("isSuperType"))) {
                    if (this.env.typeHierarchy == null) {
                        throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified.");
                    }
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: " + IdPred + " takes two arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier), "Error: the first argument of " + IdPred + " must be an identifier.\n");
                    var Type1 = Arg1.pData.data;
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT((Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier), "Error: the second argument of " + IdPred + " must be an identifier.\n");
                    var Type2 = Arg2.pData.data;
                    if (IdPred === ("isSubType")) {
                        resultat = this.env.typeHierarchy.isSubType(Type1, Type2);
                    }
                    else {
                        resultat = this.env.typeHierarchy.isSuperType(Type1, Type2);
                    }
                    if (resultat) {
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                }
                else if ((IdPred === ("immediateSubTypes")) || (IdPred === ("immediateSuperTypes")) || (IdPred === ("subTypes")) || (IdPred === ("superTypes"))) {
                    if (this.env.typeHierarchy == null) {
                        throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified.");
                    }
                    this.ASSERT((pTermRes.pTerm.size() === 3), "Error: " + IdPred + " takes two arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier), "Error: the first argument of " + IdPred + " must be an identifier.\n");
                    var Type = Arg1.pData.data;
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData == null) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: the second argument of " + IdPred + " must be a free variable or a list.\n");
                    var L = null;
                    if (IdPred === ("immediateSubTypes")) {
                        L = this.env.typeHierarchy.immediateSubTypes(Type);
                    }
                    else if (IdPred === ("immediateSuperTypes")) {
                        L = this.env.typeHierarchy.immediateSuperTypes(Type);
                    }
                    else if (IdPred === ("subTypes")) {
                        L = this.env.typeHierarchy.subTypes(Type);
                    }
                    else {
                        L = this.env.typeHierarchy.superTypes(Type);
                    }
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(2), pTermRes.index, L, pTermRes.index);
                    if (resultat) {
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                    else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }
                else if ((IdPred === ("maxComSubTypes")) || (IdPred === ("minComSuperTypes"))) {
                    if (this.env.typeHierarchy == null) {
                        throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified.");
                    }
                    this.ASSERT((pTermRes.pTerm.size() === 4), "Error:" + IdPred + " takes tree arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier), "Error: the first argument of " + IdPred + " must be an identifier.\n");
                    var Type1 = Arg1.pData.data;
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT((Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier), "Error: the second argument of " + IdPred + " must be an identifier.\n");
                    var Type2 = Arg2.pData.data;
                    var Arg3 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                    this.ASSERT(((Arg3.pData == null) || (Arg3.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: the third argument of " + IdPred + " must be a free variable or a list.\n");
                    var Types3 = null;
                    if (IdPred === ("maxComSubTypes")) {
                        Types3 = this.env.typeHierarchy.maxComSubTypes(Type1, Type2);
                    }
                    else {
                        Types3 = this.env.typeHierarchy.minComSuperTypes(Type1, Type2);
                    }
                    var aList = new PrologPlusCG.prolog.PrologList();
                    for (var listIndex = 0; listIndex < /* size */ Types3.length; ++listIndex) {
                        {
                            var aType = Types3[listIndex];
                            var aDonnee = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, aType);
                            aList.addData(aDonnee);
                        }
                        ;
                    }
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(3), pTermRes.index, new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, aList), pTermRes.index);
                    if (resultat) {
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                    else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }
                else if ((IdPred === ("maxComSubType")) || (IdPred === ("minComSuperType"))) {
                    if (this.env.typeHierarchy == null) {
                        throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified.");
                    }
                    this.ASSERT((pTermRes.pTerm.size() === 4), "Error:" + IdPred + " takes tree arguments.\n");
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier), "Error: the first argument of " + IdPred + " must be an identifier.\n");
                    var Type1 = Arg1.pData.data;
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT((Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier), "Error: the second argument of " + IdPred + " must be an identifier.\n");
                    var Type2 = Arg2.pData.data;
                    var Arg3 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                    this.ASSERT(((Arg3.pData == null) || (Arg3.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error: the third argument of " + IdPred + " must be a free variable or an identifier.\n");
                    var Type3 = null;
                    if (IdPred === ("maxComSubType")) {
                        Type3 = this.env.typeHierarchy.maxComSubType(Type1, Type2);
                    }
                    else {
                        Type3 = this.env.typeHierarchy.minComSuperType(Type1, Type2);
                    }
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(3), pTermRes.index, new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, Type3), pTermRes.index);
                    if (resultat) {
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    }
                    else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }
                if (!resultat) {
                    pTermRes.pos = 0;
                }
                return resultat;
            };
            /**
             * Dans cette nouvelle version : on cree une instanciation en profondeur du
             * du term. Pour cela, on ecrit le term dans le tampon
             * env.printer.nodeTreeDebug pour avoir la forme instanciee, en chaine de
             * caracteres et ensuite on la compile pour avoir sa representation interne
             * @param {PrologPlusCG.prolog.PrologTerm} pTerme
             * @param {number} niv
             * @return {PrologPlusCG.prolog.PrologTerm}
             */
            Resolution.prototype.assertTerm = function (pTerme, niv) {
                this.env.bWriteToDebugTree = true;
                this.env.printer.alternatePrintString = "";
                this.env.printer.printTerm$PrologPlusCG_prolog_PrologTerm$int(pTerme, niv);
                var trm = this.env.compile.compileTerm(this.env.printer.alternatePrintString);
                this.env.printer.alternatePrintString = "";
                this.env.bWriteToDebugTree = false;
                return trm;
            };
            /**
             * Ancienne def. Son probleme : elle ne fait pas une instanciation en
             * profondeur; mais juste au premier niveau PrologTerm assertTerm(PrologTerm
             * pTerme, int niv) { PrologTerm nouvTerm = new PrologTerm(); PrologData
             * uneDon; PrologDataIndexPair valArg; for (Enumeration e =
             * pTerme.elements(); e.hasMoreElements(); ) { uneDon = (PrologData)
             * e.nextElement(); valArg = env.unification.valeur(uneDon, niv); if
             * (valArg.pDonnee != null) nouvTerm.add(valArg.pDonnee); else
             * nouvTerm.add(uneDon); };
             *
             * return nouvTerm; }
             * @param {PrologPlusCG.prolog.TermToBeResolved} pTermRes
             * @param {string} IdPred
             * @return {boolean}
             */
            Resolution.prototype.resatisfyPredicateGoal = function (pTermRes, IdPred) {
                var _this = this;
                var resultat = false;
                var pLocalRules = null;
                if (IdPred === ("branchOfCG")) {
                    var Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    var unGC = Arg2.pData.data;
                    var vctRels = unGC.m_vctRelations;
                    var nbreBranch = vctRels.length;
                    while (((pTermRes.pos < nbreBranch) && !resultat)) {
                        {
                            this.env.unification.Unif_Stack.pushEmptyRecord();
                            var unGCBranch = this.createCGBranch(vctRels[pTermRes.pos]);
                            resultat = this.env.unification.unify(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uCG, unGCBranch), Arg2.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                            pTermRes.pos++;
                            if (resultat) {
                                this.Return_Stack.push(this.Exec_Stack.pop());
                            }
                            else {
                                this.env.unification.Unif_Stack.pop();
                            }
                        }
                    }
                    ;
                }
                else if (IdPred === ("concOfCG")) {
                    var Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    var unGC = Arg2.pData.data;
                    var vctConcepts = unGC.m_vctConcepts;
                    var nbreConcs = vctConcepts.length;
                    resultat = false;
                    var Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    while (((pTermRes.pos < nbreConcs) && !resultat)) {
                        {
                            this.env.unification.Unif_Stack.pushEmptyRecord();
                            var concCour = vctConcepts[pTermRes.pos];
                            if (Arg1.pData == null) {
                                resultat = this.env.unification.unify(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uConcept, concCour), Arg2.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                            }
                            else {
                                var gTmp = new PrologPlusCG.cg.CG();
                                gTmp.addConcept(concCour);
                                resultat = this.env.unification.unify(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uCG, gTmp), Arg2.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                            }
                            pTermRes.pos++;
                            if (resultat) {
                                this.Return_Stack.push(this.Exec_Stack.pop());
                            }
                            else {
                                this.env.unification.Unif_Stack.pop();
                            }
                        }
                    }
                    ;
                }
                else if (IdPred === ("member")) {
                    var Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    var pLstPrlg = null;
                    var Arg2Niv = Arg2.index;
                    if (pTermRes.lstMember == null) {
                        pLstPrlg = Arg2.pData.data;
                    }
                    else {
                        pLstPrlg = pTermRes.lstMember;
                        Arg2Niv = pTermRes.indLstMember;
                    }
                    var dernierInd = pLstPrlg.size() - 1;
                    var finished = false;
                    while ((!finished && !resultat)) {
                        {
                            while (((pTermRes.pos < dernierInd) && !resultat)) {
                                {
                                    this.env.unification.Unif_Stack.pushEmptyRecord();
                                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, pLstPrlg.getAt(pTermRes.pos), Arg2Niv);
                                    pTermRes.pos++;
                                    if (resultat) {
                                        this.Return_Stack.push(this.Exec_Stack.pop());
                                    }
                                    else {
                                        this.env.unification.Unif_Stack.pop();
                                    }
                                }
                            }
                            ;
                            if (!resultat && (pTermRes.pos === dernierInd)) {
                                if (pLstPrlg.getAt(dernierInd).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList) {
                                    var contr = this.env.unification.valueFromUnifStack(pLstPrlg.getAt(dernierInd), Arg2Niv);
                                    this.ASSERT((contr.pData != null) && (contr.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList), "Error: The second argument of member should be a list.\n");
                                    pLstPrlg = contr.pData.data;
                                    Arg2Niv = contr.index;
                                    pTermRes.lstMember = pLstPrlg;
                                    pTermRes.indLstMember = contr.index;
                                    dernierInd = pLstPrlg.size() - 1;
                                    pTermRes.pos = 0;
                                }
                                else {
                                    this.env.unification.Unif_Stack.pushEmptyRecord();
                                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, pLstPrlg.getAt(dernierInd), Arg2Niv);
                                    pTermRes.pos++;
                                    if (resultat) {
                                        this.Return_Stack.push(this.Exec_Stack.pop());
                                    }
                                    else {
                                        this.env.unification.Unif_Stack.pop();
                                    }
                                    finished = true;
                                }
                            }
                            else {
                                finished = true;
                            }
                        }
                    }
                    ;
                    if (!resultat) {
                        pTermRes.lstMember = null;
                        pTermRes.indLstMember = 0;
                    }
                }
                else if (IdPred === ("not")) {
                    if (pTermRes.pos === -1) {
                        for (var i = this.Return_Stack.indexOfTop(); ((i > pTermRes.indexInExecStack) && (i >= 0)); i--) {
                            {
                                this.Return_Stack.pop();
                                this.env.unification.Unif_Stack.pop();
                            }
                            ;
                        }
                        pTermRes.indexInExecStack = -1;
                    }
                }
                else if (IdPred === ("findall")) {
                    if (pTermRes.indLstMember !== -1) {
                        pTermRes.indLstMember = -1;
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        this.env.unification.unify(pTermRes.pTerm.getAt(3), pTermRes.index, new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, pTermRes.lstMember), pTermRes.index);
                        pTermRes.lstMember = null;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                        this.Exec_Stack.pop();
                        this.Exec_Stack.pop();
                        this.Exec_Stack.pop();
                        resultat = true;
                    }
                }
                else if (IdPred === ("retract")) {
                    var Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    if ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)) {
                        var unTrm = new PrologPlusCG.prolog.PrologTerm();
                        unTrm.addData(Arg1.pData);
                        Arg1.pData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, unTrm);
                    }
                    var IdCle_2 = this.env.compile.nameOfArgument(Arg1.pData.data, Arg1.index);
                    pLocalRules = (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.env.program, IdCle_2);
                    if (pLocalRules != null) {
                        var data2 = void 0;
                        var aRule = void 0;
                        var indRegle = 0;
                        for (var listIndex = 0; listIndex < pLocalRules.size() && !resultat; ++listIndex) {
                            {
                                aRule = pLocalRules.get(listIndex);
                                this.env.unification.Unif_Stack.pushEmptyRecord();
                                var TopOfUnification_Stack = this.env.unification.Unif_Stack.indexOfTop();
                                data2 = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, aRule.getAt(0));
                                resultat = this.env.unification.unify(data2, TopOfUnification_Stack, Arg1.pData, Arg1.index);
                                if (resultat) {
                                    this.Return_Stack.push(this.Exec_Stack.pop());
                                    aRule.myDestroy();
                                    aRule = null;
                                    pLocalRules.remove(indRegle);
                                    if (pLocalRules.isEmpty()) {
                                        /* remove */ (function (map) { var deleted = _this.env.program[IdCle_2]; delete _this.env.program[IdCle_2]; return deleted; })(this.env.program);
                                    }
                                    this.programModified = true;
                                }
                                else {
                                    this.env.unification.Unif_Stack.pop();
                                    indRegle++;
                                }
                            }
                            ;
                        }
                        data2 = null;
                        aRule = null;
                    }
                    else {
                        resultat = false;
                    }
                    IdCle_2 = null;
                }
                if (!resultat) {
                    pTermRes.pos = 0;
                }
                return resultat;
            };
            Resolution.prototype.evalExpr = function (pDon, niv) {
                var aNumber = null;
                var Arg1 = this.env.unification.valueFromUnifStack(pDon, niv);
                this.ASSERT((Arg1.pData != null), "Error: any variable in an expression should have a value.\n");
                if (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber) {
                    aNumber = Arg1.pData.data;
                }
                else if (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm) {
                    var pTerm = Arg1.pData.data;
                    var IdTerm = pTerm.getAt(0).data;
                    this.ASSERT(((IdTerm === ("add")) || (IdTerm === ("sub")) || (IdTerm === ("mul")) || (IdTerm === ("div"))), "Error: an operator in an expression must be add, sub, mul or div.\n");
                    this.ASSERT((pTerm.size() === 3), "Error: any operator must have two arguments.\n");
                    var aDataTrans1 = this.evalExpr(pTerm.getAt(1), Arg1.index);
                    this.ASSERT(((aDataTrans1 != null) && (aDataTrans1.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error : the operand should be a number.");
                    var val1 = aDataTrans1.data;
                    var aDataTrans2 = this.evalExpr(pTerm.getAt(2), Arg1.index);
                    this.ASSERT(((aDataTrans2 != null) && (aDataTrans2.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error : the operand should be a number.");
                    var val2 = aDataTrans2.data;
                    if ((typeof val1 === 'number') && (typeof val2 === 'number')) {
                        var nbreEntier = 0;
                        if (IdTerm === ("add")) {
                            nbreEntier = /* intValue */ (val1 | 0) + /* intValue */ (val2 | 0);
                        }
                        else if (IdTerm === ("sub")) {
                            nbreEntier = /* intValue */ (val1 | 0) - /* intValue */ (val2 | 0);
                        }
                        else if (IdTerm === ("mul")) {
                            nbreEntier = /* intValue */ (val1 | 0) * /* intValue */ (val2 | 0);
                        }
                        aNumber = new Number(nbreEntier).valueOf();
                        if (IdTerm === ("div")) {
                            var nbreDouble = 0.0;
                            nbreDouble = /* doubleValue */ val1 / /* doubleValue */ val2;
                            aNumber = new Number(nbreDouble).valueOf();
                        }
                    }
                    else {
                        var nbreDouble = 0.0;
                        if (IdTerm === ("add")) {
                            nbreDouble = /* doubleValue */ val1 + /* doubleValue */ val2;
                        }
                        else if (IdTerm === ("sub")) {
                            nbreDouble = /* doubleValue */ val1 - /* doubleValue */ val2;
                        }
                        else if (IdTerm === ("mul")) {
                            nbreDouble = /* doubleValue */ val1 * /* doubleValue */ val2;
                        }
                        else {
                            nbreDouble = /* doubleValue */ val1 / /* doubleValue */ val2;
                        }
                        aNumber = new Number(nbreDouble).valueOf();
                    }
                }
                else {
                    this.ASSERT(false, "Error: an element in an expression is neither a number nor an operator.\n");
                }
                Arg1 = null;
                return new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uNumber, aNumber);
            };
            Resolution.prototype.clear_globalPrlgPCGObjs = function () {
                /* clear */ (function (obj) { for (var member in obj)
                    delete obj[member]; })(this.globalPrlgPCGObjs);
            };
            Resolution.prototype.copyAllOfTheListWithUnification = function (aList, level) {
                if (aList.isEmpty()) {
                    return aList;
                }
                var newList = new PrologPlusCG.prolog.PrologList();
                this.copyListWithUnification(aList, level, newList);
                var lastElem = aList.lastElement();
                var finished = false;
                var ValVarList = null;
                var valLevel = level;
                var aList1 = null;
                while ((!finished)) {
                    {
                        ValVarList = this.env.unification.valueFromUnifStack(lastElem, valLevel);
                        valLevel = ValVarList.index;
                        if (lastElem.typeOfData === PrologPlusCG.prolog.DataTypes.uVarList) {
                            if ((ValVarList.pData != null) && (ValVarList.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uList)) {
                                throw new PrologPlusCG.prolog.ExecException("The value of the variable after | should be a list.\n");
                            }
                            else if (ValVarList.pData != null) {
                                aList1 = ValVarList.pData.data;
                                this.copyListWithUnification(aList1, ValVarList.index, newList);
                                try {
                                    lastElem = aList1.lastElement();
                                }
                                catch (expt) {
                                    finished = true;
                                }
                            }
                            else {
                                throw new PrologPlusCG.prolog.ExecException("Warning : The list is partially specified; the variable after | is free.\n");
                            }
                        }
                        else {
                            finished = true;
                            newList.addData(ValVarList.pData);
                        }
                    }
                }
                ;
                return newList;
            };
            Resolution.prototype.copyListWithUnification = function (aList, level, newList) {
                var indexOfLastElement = aList.size() - 1;
                for (var i = 0; i < indexOfLastElement; i++) {
                    {
                        var contr = this.env.unification.valueFromUnifStack(aList.elementAt(i), level);
                        newList.addData(contr.pData);
                    }
                    ;
                }
            };
            Resolution.prototype.createCGBranch = function (rel) {
                var newRelation = new PrologPlusCG.cg.Relation();
                newRelation.m_pdRelationName = rel.m_pdRelationName;
                var concSrce = rel.m_concSource;
                var newConcSrce = new PrologPlusCG.cg.Concept(concSrce.m_pdType, concSrce.m_pdReferent, concSrce.m_pdValue, this.env);
                newConcSrce.addOutgoingRelation(newRelation);
                newRelation.m_concSource = newConcSrce;
                var concDest = rel.m_concDestination;
                var newConcDest = new PrologPlusCG.cg.Concept(concDest.m_pdType, concDest.m_pdReferent, concDest.m_pdValue, this.env);
                newConcDest.addIncomingRelation(newRelation);
                newRelation.m_concDestination = newConcDest;
                var nouvVctConcs = ([]);
                /* addElement */ (nouvVctConcs.push(newConcSrce) > 0);
                /* addElement */ (nouvVctConcs.push(newConcDest) > 0);
                var newVctRels = ([]);
                /* addElement */ (newVctRels.push(newRelation) > 0);
                return new PrologPlusCG.cg.CG(nouvVctConcs, newVctRels);
            };
            Resolution.prototype.isVariableGoal = function (strIdVar, aTerm) {
                this.env.bWriteToDebugTree = true;
                this.env.printer.alternatePrintString = "";
                this.env.printer.printPrologData(aTerm, -1);
                var str = this.env.printer.alternatePrintString;
                this.env.printer.alternatePrintString = "";
                this.env.bWriteToDebugTree = false;
                var indDebStr = str.indexOf(strIdVar);
                var valRet = false;
                if (indDebStr >= 0) {
                    var taille = strIdVar.length;
                    var carAvDeb = void 0;
                    var carAprFin = void 0;
                    while (((indDebStr >= 0) && !valRet)) {
                        {
                            carAvDeb = str.charAt(indDebStr - 1);
                            carAprFin = str.charAt(indDebStr + taille);
                            if (!/[a-zA-Z\d]/.test(carAvDeb[0]) && ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(carAvDeb) != '_'.charCodeAt(0)) && !/[a-zA-Z\d]/.test(carAprFin[0]) && ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(carAprFin) != '_'.charCodeAt(0))) {
                                valRet = true;
                            }
                            else {
                                indDebStr = str.indexOf(strIdVar, indDebStr + taille);
                            }
                        }
                    }
                    ;
                }
                return valRet;
            };
            Resolution.prototype.typeFromClass = function (aClass) {
                var strClassName = (function (c) { return typeof c === 'string' ? c : c["__class"] ? c["__class"] : c["name"]; })(aClass);
                var resultType = 0;
                if ((strClassName === ("java.lang.Integer")) || (strClassName === ("int")) || (strClassName === ("java.lang.Long")) || (strClassName === ("long")) || (strClassName === ("java.lang.Double")) || (strClassName === ("double"))) {
                    resultType = PrologPlusCG.prolog.DataTypes.uNumber;
                }
                else if ((strClassName === ("java.lang.Boolean")) || (strClassName === ("boolean"))) {
                    resultType = PrologPlusCG.prolog.DataTypes.uBoolean;
                }
                else if (strClassName === ("java.lang.String")) {
                    resultType = PrologPlusCG.prolog.DataTypes.uString;
                }
                else {
                    resultType = PrologPlusCG.prolog.DataTypes.uObject;
                }
                return resultType;
            };
            Resolution.prototype.typeFromString = function (nameOfClass) {
                var result = 0;
                if ((nameOfClass === ("Long")) || (nameOfClass === ("Double"))) {
                    result = PrologPlusCG.prolog.DataTypes.uNumber;
                }
                else if (nameOfClass === ("Boolean")) {
                    result = PrologPlusCG.prolog.DataTypes.uBoolean;
                }
                else if (nameOfClass === ("String")) {
                    result = PrologPlusCG.prolog.DataTypes.uString;
                }
                else {
                    result = PrologPlusCG.prolog.DataTypes.uObject;
                }
                return result;
            };
            Resolution.prototype.typeIsPrimitive = function (typDon) {
                return ((typDon === PrologPlusCG.prolog.DataTypes.uNumber) || (typDon === PrologPlusCG.prolog.DataTypes.uBoolean) || (typDon === PrologPlusCG.prolog.DataTypes.uIdentifier) || (typDon === PrologPlusCG.prolog.DataTypes.uString));
            };
            Resolution.prototype.primitiveTypeToString = function (pData) {
                this.ASSERT(this.typeIsPrimitive(pData.typeOfData), "Error: wrong type of PrologData: Should be a number, a boolean, an identifier, or a string.\n");
                switch ((pData.typeOfData)) {
                    case 0 /* uNumber */:
                        if (typeof pData.data === 'number') {
                            var valLong = pData.data;
                            return "\"" + valLong.toString() + "\"";
                        }
                        else {
                            var valDble = pData.data;
                            return "\"" + valDble.toString() + "\"";
                        }
                    case 1 /* uBoolean */:
                        {
                            var valBool = pData.data;
                            if (valBool) {
                                return "\"true\"";
                            }
                            else {
                                return "\"false\"";
                            }
                        }
                        ;
                    case 2 /* uIdentifier */:
                        return "\"" + pData.data + "\"";
                    case 3 /* uString */:
                        return pData.data;
                }
                this.ASSERT(false, "Unreachable code reached in Resolution.primitiveTypeToString");
                return "";
            };
            return Resolution;
        }());
        prolog.Resolution = Resolution;
        Resolution["__class"] = "PrologPlusCG.prolog.Resolution";
        Resolution["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var ResolutionStack = /** @class */ (function () {
            function ResolutionStack() {
                if (this.vec === undefined) {
                    this.vec = null;
                }
                this.vec = ([]);
            }
            ResolutionStack.prototype.indexOfTop = function () {
                return ( /* size */this.vec.length - 1);
            };
            ResolutionStack.prototype.push = function (trmRes) {
                /* add */ (this.vec.push(trmRes) > 0);
            };
            ResolutionStack.prototype.lastElement = function () {
                return /* get */ this.vec[ /* size */this.vec.length - 1];
            };
            ResolutionStack.prototype.pop = function () {
                var termRes = this.lastElement();
                /* remove */ this.vec.splice(/* size */ this.vec.length - 1, 1)[0];
                return termRes;
            };
            ResolutionStack.prototype.getTop = function () {
                return this.lastElement();
            };
            ResolutionStack.prototype.makeEmpty = function () {
                /* clear */ (this.vec.length = 0);
            };
            ResolutionStack.prototype.isEmpty = function () {
                return /* isEmpty */ (this.vec.length == 0);
            };
            ResolutionStack.prototype.size = function () {
                return /* size */ this.vec.length;
            };
            ResolutionStack.prototype.get = function (i) {
                return /* get */ this.vec[i];
            };
            return ResolutionStack;
        }());
        prolog.ResolutionStack = ResolutionStack;
        ResolutionStack["__class"] = "PrologPlusCG.prolog.ResolutionStack";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var RuleVector = /** @class */ (function () {
            function RuleVector() {
                if (this.vec === undefined) {
                    this.vec = null;
                }
                this.vec = ([]);
            }
            RuleVector.prototype.getAt = function (i) {
                return /* get */ this.vec[i];
            };
            RuleVector.prototype.get = function (i) {
                return /* get */ this.vec[i];
            };
            RuleVector.prototype.size = function () {
                return /* size */ this.vec.length;
            };
            RuleVector.prototype.addRule = function (regle) {
                /* addElement */ (this.vec.push(regle) > 0);
            };
            RuleVector.prototype.trimToSize = function () {
            };
            RuleVector.prototype.add = function (i, pRule) {
                /* add */ this.vec.splice(i, 0, pRule);
            };
            RuleVector.prototype.remove = function (indRegle) {
                /* remove */ this.vec.splice(indRegle, 1)[0];
            };
            RuleVector.prototype.isEmpty = function () {
                return /* isEmpty */ (this.vec.length == 0);
            };
            RuleVector.prototype.clear = function () {
                /* clear */ (this.vec.length = 0);
            };
            return RuleVector;
        }());
        prolog.RuleVector = RuleVector;
        RuleVector["__class"] = "PrologPlusCG.prolog.RuleVector";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var StringTermIndexTriple = /** @class */ (function () {
            function StringTermIndexTriple(frmNInst, pTerm, nIndex) {
                if (this.frmNonInst === undefined) {
                    this.frmNonInst = null;
                }
                if (this.term === undefined) {
                    this.term = null;
                }
                if (this.index === undefined) {
                    this.index = 0;
                }
                this.frmNonInst = frmNInst;
                this.term = pTerm;
                this.index = nIndex;
            }
            return StringTermIndexTriple;
        }());
        prolog.StringTermIndexTriple = StringTermIndexTriple;
        StringTermIndexTriple["__class"] = "PrologPlusCG.prolog.StringTermIndexTriple";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var TermToBeResolved = /** @class */ (function () {
            function TermToBeResolved(paramTerm, paramIndex, paramPos) {
                if (((paramTerm != null && paramTerm instanceof PrologPlusCG.prolog.PrologTerm) || paramTerm === null) && ((typeof paramIndex === 'number') || paramIndex === null) && ((typeof paramPos === 'number') || paramPos === null)) {
                    var __args = arguments;
                    if (this.pTerm === undefined) {
                        this.pTerm = null;
                    }
                    if (this.index === undefined) {
                        this.index = 0;
                    }
                    if (this.pos === undefined) {
                        this.pos = 0;
                    }
                    if (this.indexInExecStack === undefined) {
                        this.indexInExecStack = 0;
                    }
                    if (this.Cle === undefined) {
                        this.Cle = null;
                    }
                    if (this.lstMember === undefined) {
                        this.lstMember = null;
                    }
                    if (this.indLstMember === undefined) {
                        this.indLstMember = 0;
                    }
                    this.lstMember = null;
                    this.indLstMember = 0;
                    this.pTerm = paramTerm;
                    this.index = paramIndex;
                    this.pos = paramPos;
                    this.indexInExecStack = -1;
                }
                else if (paramTerm === undefined && paramIndex === undefined && paramPos === undefined) {
                    var __args = arguments;
                    if (this.pTerm === undefined) {
                        this.pTerm = null;
                    }
                    if (this.index === undefined) {
                        this.index = 0;
                    }
                    if (this.pos === undefined) {
                        this.pos = 0;
                    }
                    if (this.indexInExecStack === undefined) {
                        this.indexInExecStack = 0;
                    }
                    if (this.Cle === undefined) {
                        this.Cle = null;
                    }
                    if (this.lstMember === undefined) {
                        this.lstMember = null;
                    }
                    if (this.indLstMember === undefined) {
                        this.indLstMember = 0;
                    }
                    this.lstMember = null;
                    this.indLstMember = 0;
                }
                else
                    throw new Error('invalid overload');
            }
            return TermToBeResolved;
        }());
        prolog.TermToBeResolved = TermToBeResolved;
        TermToBeResolved["__class"] = "PrologPlusCG.prolog.TermToBeResolved";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var TypeHierarchy = /** @class */ (function () {
            function TypeHierarchy(myenv) {
                this.vctAscDescTyp1 = ([]);
                this.vctAscDescTyp2 = ([]);
                this.FirstSonFatherList1 = 0;
                this.LastSonFatherList1 = 0;
                this.FirstSonFatherList2 = 0;
                this.LastSonFatherList2 = 0;
                this.descendant = true;
                if (this.hierarchy === undefined) {
                    this.hierarchy = null;
                }
                this.env = null;
                this.hierarchy = ({});
                this.env = myenv;
            }
            TypeHierarchy.prototype.createTypeHierarchy = function () {
                var pRules = (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.env.program, this.env.compile.valSysSP);
                var aRule;
                var aTerm;
                var headTerm;
                var aPrologData;
                var idTypeHead;
                var identType;
                var vctIdents;
                var cpleVct2;
                for (var listElement = 0; listElement < pRules.size(); ++listElement) {
                    {
                        aRule = pRules.get(listElement);
                        headTerm = aRule.firstElement();
                        aPrologData = headTerm.get(0);
                        idTypeHead = aPrologData.data;
                        vctIdents = ([]);
                        for (var listIndex = 0; listIndex < aRule.size(); ++listIndex) {
                            {
                                aTerm = aRule.get(listIndex);
                                aPrologData = aTerm.get(0);
                                identType = aPrologData.data;
                                /* addElement */ (vctIdents.push(identType) > 0);
                                cpleVct2 = this.get(identType);
                                if (cpleVct2 == null) {
                                    cpleVct2 = new PrologPlusCG.prolog.DataTypeVectorPair(null, ([]));
                                    this.put(identType, cpleVct2);
                                }
                                /* addElement */ (cpleVct2.vectFathers.push(idTypeHead) > 0);
                            }
                            ;
                        }
                        cpleVct2 = this.get(idTypeHead);
                        if (cpleVct2 != null) {
                            cpleVct2.vctSons = vctIdents;
                        }
                        else {
                            this.put(idTypeHead, new PrologPlusCG.prolog.DataTypeVectorPair(vctIdents, ([])));
                        }
                    }
                    ;
                }
            };
            /*private*/ TypeHierarchy.prototype.put = function (idTypeHead, dataTypeVectorPair) {
                /* put */ (this.hierarchy[idTypeHead] = dataTypeVectorPair);
            };
            /*private*/ TypeHierarchy.prototype.get = function (identType) {
                return /* get */ (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.hierarchy, identType);
            };
            TypeHierarchy.prototype.addInstance = function (Ref, identType) {
                if (this.get(identType) == null) {
                    throw new PrologPlusCG.prolog.ExecException("Error: " + identType + " is not a declared type.\n");
                }
                var pRules = (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.env.program, this.env.compile.valSysINST);
                var aRule = null;
                if (pRules == null) {
                    pRules = new PrologPlusCG.prolog.RuleVector();
                    /* put */ (this.env.program[this.env.compile.valSysINST] = pRules);
                }
                var bFound = false;
                var aTerm = null;
                var id = null;
                for (var listIndex = 0; listIndex < pRules.size() && !bFound; ++listIndex) {
                    {
                        aRule = pRules.get(listIndex);
                        aTerm = aRule.firstElement();
                        id = aTerm.getAt(0).data;
                        if (id === identType) {
                            bFound = true;
                        }
                    }
                    ;
                }
                var typRef = 0;
                if ( /* startsWith */(function (str, searchString, position) {
                    if (position === void 0) { position = 0; }
                    return str.substr(position, searchString.length) === searchString;
                })(Ref, "\"")) {
                    typRef = PrologPlusCG.prolog.DataTypes.uString;
                }
                else {
                    typRef = PrologPlusCG.prolog.DataTypes.uIdentifier;
                }
                var aPrologData = new PrologPlusCG.prolog.PrologData(typRef, Ref);
                aTerm = new PrologPlusCG.prolog.PrologTerm();
                aTerm.addData(aPrologData);
                if (!bFound) {
                    aRule = new PrologPlusCG.prolog.PrologRule();
                    var unTermTyp = new PrologPlusCG.prolog.PrologTerm();
                    unTermTyp.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, identType));
                    aRule.addTerm(unTermTyp);
                    pRules.addRule(aRule);
                }
                aRule.addTerm(aTerm);
            };
            TypeHierarchy.prototype.isInstanceOf = function (Ref, Typ) {
                var pRules = (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.env.program, this.env.compile.valSysINST);
                if (pRules == null) {
                    throw new PrologPlusCG.prolog.ExecException("Error, instance rules are not specified.\n");
                }
                var typeRef = null;
                var aRule;
                for (var listIndex = 0; listIndex < pRules.size() && (typeRef == null); ++listIndex) {
                    {
                        aRule = pRules.get(listIndex);
                        var unTerme = void 0;
                        for (var listIndex2 = 0; listIndex2 < aRule.size(); ++listIndex2) {
                            {
                                unTerme = aRule.get(listIndex2);
                                var id = unTerme.getAt(0).data;
                                if (Ref === id) {
                                    var trmTmp = aRule.firstElement();
                                    typeRef = trmTmp.getAt(0).data;
                                }
                            }
                            ;
                        }
                    }
                    ;
                }
                if (typeRef == null) {
                    throw new PrologPlusCG.prolog.ExecException("Error : " + Ref + " is not declared as an instance of any type.\n");
                }
                else {
                    return this.isSubType(typeRef, Typ);
                }
            };
            TypeHierarchy.prototype.isSubType = function (Type1, Type2) {
                var Type3 = this.maxComSubType(Type1, Type2);
                return Type3 === Type1;
            };
            TypeHierarchy.prototype.isSuperType = function (Type1, Type2) {
                var Type3 = this.minComSuperType(Type1, Type2);
                return Type3 === Type1;
            };
            TypeHierarchy.prototype.immediateSubTypes = function (Type) {
                return this.immediateSuccessors(Type, true);
            };
            TypeHierarchy.prototype.immediateSuperTypes = function (Type) {
                return this.immediateSuccessors(Type, false);
            };
            TypeHierarchy.prototype.immediateSuccessors = function (Type, isFilsDir) {
                var vctTypeSonsFathers;
                var cpleVctTypes;
                cpleVctTypes = this.get(Type);
                if (cpleVctTypes == null) {
                    throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type + " is not specified in the type hierarchy.\n");
                }
                if (isFilsDir) {
                    vctTypeSonsFathers = cpleVctTypes.vctSons;
                }
                else {
                    vctTypeSonsFathers = cpleVctTypes.vectFathers;
                }
                var uneListe = new PrologPlusCG.prolog.PrologList();
                if (vctTypeSonsFathers != null) {
                    var T = null;
                    for (var listIndex3 = 0; listIndex3 < /* size */ vctTypeSonsFathers.length; ++listIndex3) {
                        {
                            T = /* get */ vctTypeSonsFathers[listIndex3];
                            uneListe.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, T));
                        }
                        ;
                    }
                }
                return new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, uneListe);
            };
            TypeHierarchy.prototype.subTypes = function (Type) {
                return this.successor(Type, true);
            };
            TypeHierarchy.prototype.superTypes = function (Type) {
                return this.successor(Type, false);
            };
            TypeHierarchy.prototype.successor = function (Type, isSonsDirection) {
                var vctTypeDscds = ([]);
                if (this.get(Type) == null) {
                    throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type + " is not specified in the type hierarchy.\n");
                }
                /* addElement */ (vctTypeDscds.push(Type) > 0);
                var cpleVctTypes;
                var vctTypeSonsFathers;
                var currType;
                var type2;
                var tailleVctFsPr;
                for (var ind = 0; ind < /* size */ vctTypeDscds.length; ind++) {
                    {
                        currType = vctTypeDscds[ind];
                        cpleVctTypes = this.get(currType);
                        if (isSonsDirection) {
                            vctTypeSonsFathers = cpleVctTypes.vctSons;
                        }
                        else {
                            vctTypeSonsFathers = cpleVctTypes.vectFathers;
                        }
                        if (vctTypeSonsFathers != null) {
                            tailleVctFsPr = /* size */ vctTypeSonsFathers.length;
                            for (var ind2 = 0; ind2 < tailleVctFsPr; ind2++) {
                                {
                                    type2 = vctTypeSonsFathers[ind2];
                                    var elemExist = false;
                                    var T = null;
                                    for (var listIndex4 = 0; listIndex4 < /* size */ vctTypeDscds.length && !elemExist; ++listIndex4) {
                                        {
                                            T = /* get */ vctTypeDscds[listIndex4];
                                            elemExist = T === type2;
                                        }
                                        ;
                                    }
                                    if (!elemExist) {
                                        /* addElement */ (vctTypeDscds.push(type2) > 0);
                                    }
                                }
                                ;
                            }
                        }
                    }
                    ;
                }
                /* removeElementAt */ vctTypeDscds.splice(0, 1);
                var uneListe = new PrologPlusCG.prolog.PrologList();
                if (vctTypeDscds != null) {
                    var T = null;
                    for (var listIndex5 = 0; listIndex5 < /* size */ vctTypeDscds.length; ++listIndex5) {
                        {
                            T = /* get */ vctTypeDscds[listIndex5];
                            uneListe.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, T));
                        }
                        ;
                    }
                }
                return new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, uneListe);
            };
            TypeHierarchy.prototype.minComSuperType = function (Type1, Type2) {
                if (!this.containsKey(Type1)) {
                    throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type1 + " is not specified in the type hierarchy.\n");
                }
                if (!this.containsKey(Type2)) {
                    throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type2 + " is not specified in the type hierarchy.\n");
                }
                this.descendant = false;
                /* clear */ (this.vctAscDescTyp1.length = 0);
                /* addElement */ (this.vctAscDescTyp1.push(new PrologPlusCG.prolog.IdentifierIndexPair(Type1, 0)) > 0);
                /* clear */ (this.vctAscDescTyp2.length = 0);
                /* addElement */ (this.vctAscDescTyp2.push(Type2) > 0);
                this.FirstSonFatherList1 = this.LastSonFatherList1 = this.FirstSonFatherList2 = this.LastSonFatherList2 = 0;
                var bStop = false;
                var Type3 = this.getTypeInCommon();
                while ((!bStop && (Type3 == null))) {
                    {
                        if (!this.addNewSonsFathers1() && !this.addNewSonsFathers2()) {
                            bStop = true;
                        }
                        else {
                            Type3 = this.getTypeInCommon();
                        }
                    }
                }
                ;
                if ((Type3 == null) || (Type3 === ("Universal")) || (Type3 === ("UNIVERSAL"))) {
                    return "Universal";
                }
                else {
                    return Type3;
                }
            };
            /*private*/ TypeHierarchy.prototype.containsKey = function (type1) {
                return /* containsKey */ this.hierarchy.hasOwnProperty(type1);
            };
            TypeHierarchy.prototype.minComSuperTypes = function (Type1, Type2) {
                if (!this.containsKey(Type1)) {
                    throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type1 + " is not specified in the type hierarchy.\n");
                }
                if (!this.containsKey(Type2)) {
                    throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type2 + " is not specified in the type hierarchy.\n");
                }
                if (this.isSuperType(Type1, Type2)) {
                    var Types = ([]);
                    /* add */ (Types.push(Type1) > 0);
                    return Types;
                }
                else if (this.isSuperType(Type2, Type1)) {
                    var Types = ([]);
                    /* add */ (Types.push(Type2) > 0);
                    return Types;
                }
                this.descendant = false;
                /* clear */ (this.vctAscDescTyp1.length = 0);
                /* addElement */ (this.vctAscDescTyp1.push(new PrologPlusCG.prolog.IdentifierIndexPair(Type1, 0)) > 0);
                /* clear */ (this.vctAscDescTyp2.length = 0);
                /* addElement */ (this.vctAscDescTyp2.push(Type2) > 0);
                this.FirstSonFatherList1 = this.LastSonFatherList1 = this.FirstSonFatherList2 = this.LastSonFatherList2 = 0;
                var bStop = false;
                while ((!bStop)) {
                    {
                        if (!this.addNewSonsFathers1() && !this.addNewSonsFathers2()) {
                            bStop = true;
                        }
                    }
                }
                ;
                var Types3 = this.getMaxMinTypesInCommon();
                if ((Types3 == null) || (Types3[0].toUpperCase() === ("UNIVERSAL"))) {
                    var UniversalVector = ([]);
                    /* add */ (UniversalVector.push("Universal") > 0);
                    return UniversalVector;
                }
                else {
                    return Types3;
                }
            };
            TypeHierarchy.prototype.maxComSubType = function (Type1, Type2) {
                if (!this.containsKey(Type1)) {
                    throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type1 + " is not specified in the type hierarchy.\n");
                }
                if (!this.containsKey(Type2)) {
                    throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type2 + " is not specified in the type hierarchy.\n");
                }
                this.descendant = true;
                /* clear */ (this.vctAscDescTyp1.length = 0);
                /* addElement */ (this.vctAscDescTyp1.push(new PrologPlusCG.prolog.IdentifierIndexPair(Type1, 0)) > 0);
                /* clear */ (this.vctAscDescTyp2.length = 0);
                /* addElement */ (this.vctAscDescTyp2.push(Type2) > 0);
                this.FirstSonFatherList1 = this.LastSonFatherList1 = this.FirstSonFatherList2 = this.LastSonFatherList2 = 0;
                var bStop = false;
                var Type3 = this.getTypeInCommon();
                while ((!bStop && (Type3 == null))) {
                    {
                        if (!this.addNewSonsFathers1() && !this.addNewSonsFathers2()) {
                            bStop = true;
                        }
                        else {
                            Type3 = this.getTypeInCommon();
                        }
                    }
                }
                ;
                if ((Type3 == null) || (Type3 === ("Absurd"))) {
                    return "Absurd";
                }
                else {
                    return Type3;
                }
            };
            TypeHierarchy.prototype.maxComSubTypes = function (Type1, Type2) {
                if (!this.containsKey(Type1)) {
                    throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type1 + " is not specified in the type hierarchy.\n");
                }
                if (!this.containsKey(Type2)) {
                    throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type2 + " is not specified in the type hierarchy.\n");
                }
                if (this.isSubType(Type1, Type2)) {
                    var Types = ([]);
                    /* add */ (Types.push(Type1) > 0);
                    return Types;
                }
                else if (this.isSubType(Type2, Type1)) {
                    var Types = ([]);
                    /* add */ (Types.push(Type2) > 0);
                    return Types;
                }
                this.descendant = true;
                /* clear */ (this.vctAscDescTyp1.length = 0);
                /* addElement */ (this.vctAscDescTyp1.push(new PrologPlusCG.prolog.IdentifierIndexPair(Type1, 0)) > 0);
                /* clear */ (this.vctAscDescTyp2.length = 0);
                /* addElement */ (this.vctAscDescTyp2.push(Type2) > 0);
                this.FirstSonFatherList1 = this.LastSonFatherList1 = this.FirstSonFatherList2 = this.LastSonFatherList2 = 0;
                var bStop = false;
                while ((!bStop)) {
                    {
                        if (!this.addNewSonsFathers1() && !this.addNewSonsFathers2()) {
                            bStop = true;
                        }
                    }
                }
                ;
                var Types3 = this.getMaxMinTypesInCommon();
                if ((Types3 == null) || (Types3[0].toUpperCase() === ("ABSURD"))) {
                    var AbsurdVector = ([]);
                    /* add */ (AbsurdVector.push("Absurd") > 0);
                    return AbsurdVector;
                }
                else {
                    return Types3;
                }
            };
            TypeHierarchy.prototype.getTypeInCommon = function () {
                var Type3 = null;
                var unIdInd;
                var id2;
                for (var listIndex1 = 0; listIndex1 < /* size */ this.vctAscDescTyp1.length && (Type3 == null); ++listIndex1) {
                    {
                        unIdInd = /* get */ this.vctAscDescTyp1[listIndex1];
                        while (((unIdInd.index <= this.LastSonFatherList2) && (Type3 == null))) {
                            {
                                id2 = this.vctAscDescTyp2[unIdInd.index];
                                if (id2 === unIdInd.idType) {
                                    Type3 = id2;
                                }
                                else {
                                    unIdInd.index++;
                                }
                            }
                        }
                        ;
                    }
                    ;
                }
                return Type3;
            };
            TypeHierarchy.prototype.getMaxMinTypesInCommon = function () {
                var Types3 = null;
                var unIdInd;
                var id2;
                for (var listIndex1 = 0; listIndex1 < /* size */ this.vctAscDescTyp1.length; ++listIndex1) {
                    {
                        unIdInd = /* get */ this.vctAscDescTyp1[listIndex1];
                        while (((unIdInd.index <= this.LastSonFatherList2))) {
                            {
                                id2 = this.vctAscDescTyp2[unIdInd.index];
                                if (id2 === unIdInd.idType) {
                                    if (Types3 == null) {
                                        Types3 = ([]);
                                    }
                                    var bSonOrFatherWasFound = false;
                                    try {
                                        for (var listIndex2 = 0; listIndex2 < /* size */ Types3.length && !bSonOrFatherWasFound; ++listIndex2) {
                                            {
                                                var Types3Typ = Types3[listIndex2];
                                                if (this.descendant) {
                                                    bSonOrFatherWasFound = this.isSubType(Types3Typ, id2);
                                                }
                                                else {
                                                    bSonOrFatherWasFound = this.isSuperType(Types3Typ, id2);
                                                }
                                            }
                                            ;
                                        }
                                    }
                                    catch (exc) {
                                    }
                                    if (!bSonOrFatherWasFound) {
                                        /* add */ (Types3.push(id2) > 0);
                                    }
                                }
                                unIdInd.index++;
                            }
                        }
                        ;
                    }
                    ;
                }
                return Types3;
            };
            /*private*/ TypeHierarchy.prototype.addNewSonsFathers1 = function () {
                var bSomeWereAdded = true;
                var nIdIndex;
                var idSonFather;
                var vctTypeSonsFathers;
                var cpleVctTypes;
                while ((this.FirstSonFatherList1 <= this.LastSonFatherList1)) {
                    {
                        nIdIndex = this.vctAscDescTyp1[this.FirstSonFatherList1];
                        cpleVctTypes = this.get(nIdIndex.idType);
                        if (this.descendant) {
                            vctTypeSonsFathers = cpleVctTypes.vctSons;
                        }
                        else {
                            vctTypeSonsFathers = cpleVctTypes.vectFathers;
                        }
                        if (vctTypeSonsFathers != null) {
                            for (var listIndex1 = 0; listIndex1 < /* size */ vctTypeSonsFathers.length; ++listIndex1) {
                                {
                                    idSonFather = /* get */ vctTypeSonsFathers[listIndex1];
                                    /* addElement */ (this.vctAscDescTyp1.push(new PrologPlusCG.prolog.IdentifierIndexPair(idSonFather, 0)) > 0);
                                }
                                ;
                            }
                        }
                        this.FirstSonFatherList1++;
                    }
                }
                ;
                var Last = this.vctAscDescTyp1.length - 1;
                if (this.LastSonFatherList1 === Last) {
                    bSomeWereAdded = false;
                }
                else {
                    this.LastSonFatherList1 = Last;
                }
                return bSomeWereAdded;
            };
            /*private*/ TypeHierarchy.prototype.addNewSonsFathers2 = function () {
                var bSomeWereAdded = true;
                var strId;
                var idSonFather;
                var vctTypeSonsFathers;
                var cpleVctTypes;
                while ((this.FirstSonFatherList2 <= this.LastSonFatherList2)) {
                    {
                        strId = this.vctAscDescTyp2[this.FirstSonFatherList2];
                        cpleVctTypes = this.get(strId);
                        if (this.descendant) {
                            vctTypeSonsFathers = cpleVctTypes.vctSons;
                        }
                        else {
                            vctTypeSonsFathers = cpleVctTypes.vectFathers;
                        }
                        if (vctTypeSonsFathers != null) {
                            for (var listIndex2 = 0; listIndex2 < /* size */ vctTypeSonsFathers.length; ++listIndex2) {
                                {
                                    idSonFather = /* get */ vctTypeSonsFathers[listIndex2];
                                    /* addElement */ (this.vctAscDescTyp2.push(idSonFather) > 0);
                                }
                                ;
                            }
                        }
                        this.FirstSonFatherList2++;
                    }
                }
                ;
                var Last = this.vctAscDescTyp2.length - 1;
                if (this.LastSonFatherList2 === Last) {
                    bSomeWereAdded = false;
                }
                else {
                    this.LastSonFatherList2 = Last;
                }
                return bSomeWereAdded;
            };
            TypeHierarchy.prototype.clear = function () {
                /* clear */ (function (obj) { for (var member in obj)
                    delete obj[member]; })(this.hierarchy);
            };
            return TypeHierarchy;
        }());
        prolog.TypeHierarchy = TypeHierarchy;
        TypeHierarchy["__class"] = "PrologPlusCG.prolog.TypeHierarchy";
        TypeHierarchy["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var Unification = /** @class */ (function () {
            function Unification(myenv) {
                this.Unif_Stack = new PrologPlusCG.prolog.UnificationStack();
                this.bUnifyCurCG = false;
                this.vctConstraints = ([]);
                if (this.indexList1 === undefined) {
                    this.indexList1 = 0;
                }
                if (this.env === undefined) {
                    this.env = null;
                }
                this.env = myenv;
            }
            Unification.prototype.makeEmpty_vctContstraints = function () {
                var aConstraint;
                for (var listIndex = 0; listIndex < /* size */ this.vctConstraints.length; ++listIndex) {
                    {
                        aConstraint = /* get */ this.vctConstraints[listIndex];
                        aConstraint.myDestroy();
                    }
                    ;
                }
                /* clear */ (this.vctConstraints.length = 0);
            };
            Unification.prototype.removeConstraints = function () {
                var aConstraint;
                for (var listIndex = 0; listIndex < /* size */ this.vctConstraints.length; ++listIndex) {
                    {
                        aConstraint = /* get */ this.vctConstraints[listIndex];
                        if (aConstraint.m_LeftData == null) {
                            this.removeConstraintValue(aConstraint.m_RightData, aConstraint.m_levelOfRightData);
                        }
                        else if (aConstraint.m_RightData == null) {
                            this.removeConstraintValue(aConstraint.m_LeftData, aConstraint.m_levelOfLeftData);
                        }
                        else {
                            this.Unif_Stack.removeVariable(aConstraint.m_LeftData, aConstraint.m_levelOfLeftData, aConstraint.m_RightData, aConstraint.m_levelOfRightData);
                            this.Unif_Stack.removeVariable(aConstraint.m_RightData, aConstraint.m_levelOfRightData, aConstraint.m_LeftData, aConstraint.m_levelOfLeftData);
                        }
                        aConstraint.myDestroy();
                    }
                    ;
                }
                /* clear */ (this.vctConstraints.length = 0);
            };
            Unification.prototype.unify = function (pLeftData, indexOfLeftData, pRightData, indexOfRightData) {
                if (this.isAnonymousVariable(pLeftData) || this.isAnonymousVariable(pRightData)) {
                    return true;
                }
                var unifiable = true;
                var valueIndexLeft = this.valueFromUnifStack(pLeftData, indexOfLeftData);
                var valueIndexRight = this.valueFromUnifStack(pRightData, indexOfRightData);
                if ((valueIndexLeft.pData == null) && (valueIndexRight.pData != null)) {
                    this.addConstraint2(valueIndexRight.pData, valueIndexRight.index, pLeftData.data, indexOfLeftData);
                }
                else if ((valueIndexLeft.pData != null) && (valueIndexRight.pData == null)) {
                    this.addConstraint2(valueIndexLeft.pData, valueIndexLeft.index, pRightData.data, indexOfRightData);
                }
                else if ((valueIndexLeft.pData == null) && (valueIndexRight.pData == null)) {
                    this.addConstraint3(pLeftData.data, indexOfLeftData, pRightData.data, indexOfRightData);
                }
                else if ((valueIndexLeft.pData.typeOfData !== valueIndexRight.pData.typeOfData) && (((valueIndexLeft.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uCG) && (valueIndexLeft.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uConcept)) || ((valueIndexRight.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uCG) && (valueIndexRight.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uConcept)))) {
                    unifiable = false;
                }
                else {
                    var pData1Left = void 0;
                    var pData1Right = void 0;
                    pData1Left = valueIndexLeft.pData.data;
                    pData1Right = valueIndexRight.pData.data;
                    if (pData1Left === pData1Right) {
                        return true;
                    }
                    switch ((valueIndexLeft.pData.typeOfData)) {
                        case 0 /* uNumber */:
                            {
                                var tmp1Left = pData1Left;
                                var tmp1Right = pData1Right;
                                unifiable = ( /* doubleValue */tmp1Left === /* doubleValue */ tmp1Right);
                                tmp1Left = tmp1Right = null;
                            }
                            ;
                            break;
                        case 1 /* uBoolean */:
                            {
                                var tmp1Left = pData1Left;
                                var tmp1Right = pData1Right;
                                unifiable = ( /* booleanValue */tmp1Left === /* booleanValue */ tmp1Right);
                                tmp1Left = tmp1Right = null;
                            }
                            ;
                            break;
                        case 2 /* uIdentifier */:
                        case 3 /* uString */:
                            {
                                var strData1 = pData1Left;
                                var strData2 = pData1Right;
                                unifiable = strData1 === strData2;
                                strData1 = strData2 = null;
                            }
                            ;
                            break;
                        case 44 /* uSet */:
                            {
                                var pList1 = pData1Left;
                                var pList2 = pData1Right;
                                unifiable = this.env.compile.set1IsSubsetOfSet2(pList1, pList2);
                                pList1 = pList2 = null;
                            }
                            ;
                            break;
                        case 13 /* uList */:
                            {
                                var pList1 = pData1Left;
                                var pList2 = pData1Right;
                                this.indexList1 = 0;
                                var indexList2 = 0;
                                var indexLastElemList1 = pList1.size() - 1;
                                var indexLastElemList2 = pList2.size() - 1;
                                var bStop = false;
                                while ((unifiable && (!bStop) && (this.indexList1 <= indexLastElemList1) && (indexList2 <= indexLastElemList2))) {
                                    {
                                        if ((((pList1.elementAt(this.indexList1).typeOfData) !== PrologPlusCG.prolog.DataTypes.uVarList) && ((pList2.elementAt(indexList2).typeOfData) !== PrologPlusCG.prolog.DataTypes.uVarList)) || (((pList1.elementAt(this.indexList1).typeOfData) === PrologPlusCG.prolog.DataTypes.uVarList) && ((pList2.elementAt(indexList2).typeOfData) === PrologPlusCG.prolog.DataTypes.uVarList))) {
                                            unifiable = this.unify(pList1.elementAt(this.indexList1), valueIndexLeft.index, pList2.elementAt(indexList2), valueIndexRight.index);
                                            this.indexList1++;
                                            indexList2++;
                                        }
                                        else if ((pList1.elementAt(this.indexList1).typeOfData) === PrologPlusCG.prolog.DataTypes.uVarList) {
                                            var data1Left = pList1.elementAt(this.indexList1);
                                            var listCopy = this.copyList(pList2, indexList2);
                                            var data1Right = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, listCopy);
                                            unifiable = this.unify(data1Left, valueIndexLeft.index, data1Right, valueIndexRight.index);
                                            data1Left = data1Right = null;
                                            listCopy = null;
                                            bStop = true;
                                        }
                                        else {
                                            var listCopy = this.copyList(pList1, this.indexList1);
                                            var data1Left = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, listCopy);
                                            var data1Right = pList2.elementAt(indexList2);
                                            unifiable = this.unify(data1Left, valueIndexLeft.index, data1Right, valueIndexRight.index);
                                            data1Left = data1Right = null;
                                            bStop = true;
                                        }
                                    }
                                }
                                ;
                                if (unifiable && (!bStop)) {
                                    if (this.indexList1 <= indexLastElemList1) {
                                        if ((pList1.elementAt(this.indexList1).typeOfData) === PrologPlusCG.prolog.DataTypes.uVarList) {
                                            var data1Left = pList1.elementAt(this.indexList1);
                                            var listCopy = new PrologPlusCG.prolog.PrologList();
                                            var data1Right = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, listCopy);
                                            unifiable = this.unify(data1Left, valueIndexLeft.index, data1Right, valueIndexRight.index);
                                            data1Left = data1Right = null;
                                            listCopy = null;
                                            bStop = true;
                                        }
                                        else {
                                            unifiable = false;
                                        }
                                    }
                                    else if (indexList2 <= indexLastElemList2) {
                                        if ((pList2.elementAt(indexList2).typeOfData) === PrologPlusCG.prolog.DataTypes.uVarList) {
                                            var listCopy = new PrologPlusCG.prolog.PrologList();
                                            var data1Left = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, listCopy);
                                            var data1Right = pList2.elementAt(indexList2);
                                            unifiable = this.unify(data1Left, valueIndexLeft.index, data1Right, valueIndexRight.index);
                                            data1Left = data1Right = null;
                                            bStop = true;
                                        }
                                        else {
                                            unifiable = false;
                                        }
                                    }
                                }
                                if (!unifiable || !(bStop || ((this.indexList1 > indexLastElemList1) && (indexList2 > indexLastElemList2)))) {
                                    unifiable = false;
                                }
                                pList1 = pList2 = null;
                            }
                            ;
                            break;
                        case 11 /* uTerm */:
                            {
                                var pTerm1 = pData1Left;
                                var pTerm2 = pData1Right;
                                var tailleTerm1 = pTerm1.size();
                                var tailleTerm2 = pTerm2.size();
                                unifiable = (tailleTerm1 === tailleTerm2);
                                for (var i = 0; (unifiable && (i < tailleTerm1)); i++) {
                                    {
                                        unifiable = this.unify(pTerm1.elementAt(i), valueIndexLeft.index, pTerm2.elementAt(i), valueIndexRight.index);
                                    }
                                    ;
                                }
                                pTerm1 = pTerm2 = null;
                            }
                            ;
                            break;
                        case 37 /* uConcept */:
                            {
                                if (valueIndexRight.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) {
                                    var gTmp = new PrologPlusCG.cg.CG();
                                    gTmp.addConcept(pData1Left);
                                    this.bUnifyCurCG = true;
                                    var uneUnifCG = new PrologPlusCG.prolog.UnifyCG(this.env);
                                    try {
                                        unifiable = uneUnifCG.UnifyGC(pData1Right, valueIndexRight.index, gTmp, valueIndexLeft.index);
                                    }
                                    catch (excConform) {
                                        this.env.recordErrorMessage(excConform.message);
                                        unifiable = false;
                                    }
                                    this.bUnifyCurCG = false;
                                }
                                else {
                                    var aUnifyCG = new PrologPlusCG.prolog.UnifyCG(this.env);
                                    try {
                                        unifiable = aUnifyCG.UnifyConc(pData1Left, pData1Right, valueIndexLeft.index, valueIndexRight.index);
                                    }
                                    catch (excConform) {
                                        this.env.recordErrorMessage(excConform.message);
                                        unifiable = false;
                                    }
                                }
                            }
                            ;
                            break;
                        case 14 /* uCG */:
                            {
                                if (valueIndexRight.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uConcept) {
                                    var gTmp = new PrologPlusCG.cg.CG();
                                    gTmp.addConcept(pData1Right);
                                    this.bUnifyCurCG = true;
                                    var uneUnifCG = new PrologPlusCG.prolog.UnifyCG(this.env);
                                    try {
                                        unifiable = uneUnifCG.UnifyGC(gTmp, valueIndexRight.index, pData1Left, valueIndexLeft.index);
                                    }
                                    catch (excConform) {
                                        this.env.recordErrorMessage(excConform.message);
                                        unifiable = false;
                                    }
                                    this.bUnifyCurCG = false;
                                }
                                else {
                                    this.bUnifyCurCG = true;
                                    var uneUnifCG = new PrologPlusCG.prolog.UnifyCG(this.env);
                                    try {
                                        unifiable = uneUnifCG.UnifyGC(pData1Right, valueIndexRight.index, pData1Left, valueIndexLeft.index);
                                    }
                                    catch (excConform) {
                                        this.env.recordErrorMessage(excConform.message);
                                        unifiable = false;
                                    }
                                    this.bUnifyCurCG = false;
                                }
                            }
                            ;
                            break;
                        default:
                            throw new PrologPlusCG.prolog.ExecException("Error : an attempt to unify no pure Prolog+CG data; like Java objects. ");
                    }
                    pData1Left = pData1Right = null;
                }
                valueIndexLeft = valueIndexRight = null;
                return (unifiable);
            };
            Unification.prototype.copyList = function (pList, startIndex) {
                var newList = new PrologPlusCG.prolog.PrologList();
                var numberOfElementsToRead = pList.size() - startIndex;
                for (var Ind = 0; Ind < numberOfElementsToRead; Ind++) {
                    {
                        newList.addElement(pList.elementAt(startIndex + Ind));
                    }
                    ;
                }
                return newList;
            };
            Unification.prototype.valueFromUnifStack = function (pData, level) {
                if ((pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uVariable) && (pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uVarList)) {
                    return (new PrologPlusCG.prolog.PrologDataIndexPair(pData, level));
                }
                else {
                    var recUnif = this.Unif_Stack.get(level);
                    var lstContr = recUnif.get(pData.data);
                    if ((lstContr != null) && (lstContr.ValInd != null)) {
                        return lstContr.ValInd;
                    }
                    else {
                        return (new PrologPlusCG.prolog.PrologDataIndexPair(null, 0));
                    }
                }
            };
            Unification.prototype.addConstraint3 = function (pVarGch, indVarGch, pVarDrt, indVarDrt) {
                this.addVariableConstraint(pVarGch, indVarGch, pVarDrt, indVarDrt);
                this.addVariableConstraint(pVarDrt, indVarDrt, pVarGch, indVarGch);
                if (this.bUnifyCurCG) {
                    /* addElement */ (this.vctConstraints.push(new PrologPlusCG.prolog.Constraint(pVarGch, indVarGch, pVarDrt, indVarDrt)) > 0);
                }
            };
            Unification.prototype.addVariableConstraint = function (pVarFcs, indVarFcs, pVarAtr, indVarAtr) {
                var recUnif = this.Unif_Stack.elementAt(indVarFcs);
                var pCLContr = recUnif.get(pVarFcs);
                if (pCLContr == null) {
                    pCLContr = new PrologPlusCG.prolog.VariableIndexPairList();
                    pCLContr.addElement(new PrologPlusCG.prolog.VariableIndexPair(pVarAtr, indVarAtr));
                    recUnif.put(pVarFcs, pCLContr);
                    return;
                }
                var bFound = false;
                var VarInd;
                for (var listIndex = 0; listIndex < pCLContr.size() && !bFound; ++listIndex) {
                    {
                        VarInd = pCLContr.get(listIndex);
                        if (VarInd.idVariable == null) {
                            bFound = true;
                            VarInd.idVariable = pVarAtr;
                            VarInd.index = indVarAtr;
                        }
                    }
                    ;
                }
                if (!bFound) {
                    pCLContr.addElement(new PrologPlusCG.prolog.VariableIndexPair(pVarAtr, indVarAtr));
                }
            };
            Unification.prototype.removeConstraintValue = function (idVar, nivVar) {
                var recUnif = this.Unif_Stack.elementAt(nivVar);
                var pCLContr = recUnif.get(idVar);
                pCLContr.ValInd.pData = null;
            };
            Unification.prototype.addConstraint2 = function (pVal, nivVal, pVar, nivVar) {
                if (pVal.typeOfData === PrologPlusCG.prolog.DataTypes.uList) {
                    var uneList = pVal.data;
                    var uneDonTmp = null;
                    try {
                        uneDonTmp = uneList.lastElement();
                    }
                    catch (nsex) {
                    }
                    if ((uneDonTmp != null) && (uneDonTmp.typeOfData === PrologPlusCG.prolog.DataTypes.uVarList)) {
                        var ValVarList = this.valueFromUnifStack(uneDonTmp, nivVal);
                        if ((ValVarList.pData != null) && (ValVarList.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uList)) {
                            throw new PrologPlusCG.prolog.ExecException("The value of the variable after | should be a list.\n");
                        }
                    }
                }
                var recUnif = this.Unif_Stack.getTop();
                var pCLContr = new PrologPlusCG.prolog.VariableIndexPairList();
                pCLContr.ValInd = new PrologPlusCG.prolog.PrologDataIndexPair(pVal, nivVal);
                recUnif.put(/* toString */ ('' + (this.env.aResolution.cptVarBid)), pCLContr);
                this.env.aResolution.cptVarBid++;
                this.propagateValue(pVar, nivVar, pCLContr.ValInd);
                recUnif = null;
                pCLContr = null;
                if (this.bUnifyCurCG) {
                    /* addElement */ (this.vctConstraints.push(new PrologPlusCG.prolog.Constraint(null, nivVal, pVar, nivVar)) > 0);
                }
            };
            Unification.prototype.propagateValue = function (pVar, levelOfVar, contrVal) {
                if (pVar == null) {
                    return;
                }
                var recUnif = this.Unif_Stack.elementAt(levelOfVar);
                var pCLContr = recUnif.get(pVar);
                if (pCLContr != null) {
                    if ((pCLContr.ValInd == null) || (pCLContr.ValInd.pData == null)) {
                        pCLContr.ValInd = contrVal;
                        var VarInd = void 0;
                        for (var listIndex2 = 0; listIndex2 < pCLContr.size(); ++listIndex2) {
                            {
                                VarInd = pCLContr.get(listIndex2);
                                this.propagateValue(VarInd.idVariable, VarInd.index, contrVal);
                            }
                            ;
                        }
                        VarInd = null;
                    }
                }
                else {
                    pCLContr = new PrologPlusCG.prolog.VariableIndexPairList();
                    pCLContr.ValInd = contrVal;
                    recUnif.put(pVar, pCLContr);
                }
                recUnif = null;
                pCLContr = null;
            };
            Unification.prototype.isAnonymousVariable = function (pDon) {
                if ((pDon != null) && ((pDon.typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (pDon.typeOfData === PrologPlusCG.prolog.DataTypes.uVarList))) {
                    return (pDon.data === ("_"));
                }
                else {
                    return false;
                }
            };
            return Unification;
        }());
        prolog.Unification = Unification;
        Unification["__class"] = "PrologPlusCG.prolog.Unification";
        Unification["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var UnificationRecord = /** @class */ (function () {
            function UnificationRecord() {
                if (this.record === undefined) {
                    this.record = null;
                }
                this.record = ({});
            }
            UnificationRecord.prototype.get = function (key) {
                return /* get */ (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.record, key);
            };
            UnificationRecord.prototype.put = function (key, value) {
                /* put */ (this.record[key] = value);
            };
            UnificationRecord.prototype.keys = function () {
                var result = ([]);
                var keys = Object.keys(this.record);
                for (var index = 0; index < keys.length; index++) {
                    var key = keys[index];
                    {
                        /* add */ (result.push(key) > 0);
                    }
                }
                return result;
            };
            UnificationRecord.prototype.isEmpty = function () {
                return /* isEmpty */ (Object.keys(this.record).length == 0);
            };
            UnificationRecord.prototype.clear = function () {
                /* clear */ (function (obj) { for (var member in obj)
                    delete obj[member]; })(this.record);
            };
            return UnificationRecord;
        }());
        prolog.UnificationRecord = UnificationRecord;
        UnificationRecord["__class"] = "PrologPlusCG.prolog.UnificationRecord";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var UnificationStack = /** @class */ (function () {
            function UnificationStack() {
                if (this.vec === undefined) {
                    this.vec = null;
                }
                this.vec = ([]);
            }
            UnificationStack.prototype.indexOfTop = function () {
                return ( /* size */this.vec.length - 1);
            };
            UnificationStack.prototype.push = function (recUnif) {
                /* add */ (this.vec.push(recUnif) > 0);
            };
            UnificationStack.prototype.pushEmptyRecord = function () {
                this.push(new PrologPlusCG.prolog.UnificationRecord());
            };
            UnificationStack.prototype.pop = function () {
                var recUnif = this.getTop();
                var pCLContr;
                var strVar;
                var recUnifKeys = recUnif.keys();
                for (var listIndex = 0; listIndex < /* size */ recUnifKeys.length; ++listIndex) {
                    {
                        strVar = /* get */ recUnifKeys[listIndex];
                        pCLContr = recUnif.get(strVar);
                        if (pCLContr.ValInd != null) {
                            pCLContr.ValInd.pData = null;
                        }
                        var VarInd = void 0;
                        for (var listIndex2 = 0; listIndex2 < pCLContr.size(); ++listIndex2) {
                            {
                                VarInd = pCLContr.get(listIndex2);
                                this.removeVariable(VarInd.idVariable, VarInd.index, strVar, this.indexOfTop());
                                VarInd.idVariable = null;
                            }
                            ;
                        }
                        VarInd = null;
                        pCLContr.clear();
                    }
                    ;
                }
                pCLContr = null;
                strVar = null;
                recUnif.clear();
                /* remove */ this.vec.splice(/* size */ this.vec.length - 1, 1)[0];
                return recUnif;
            };
            UnificationStack.prototype.lastElement = function () {
                return /* get */ this.vec[ /* size */this.vec.length - 1];
            };
            UnificationStack.prototype.getTop = function () {
                return this.lastElement();
            };
            UnificationStack.prototype.makeEmpty = function () {
                /* clear */ (this.vec.length = 0);
            };
            UnificationStack.prototype.get = function (index) {
                return /* get */ this.vec[index];
            };
            UnificationStack.prototype.elementAt = function (index) {
                return /* get */ this.vec[index];
            };
            UnificationStack.prototype.removeVariable = function (sVar, niv, sVarAtr, nivVarAtr) {
                if (sVar == null) {
                    return;
                }
                var recUnif = this.vec[niv];
                var pCLContr = recUnif.get(sVar);
                var bFound = false;
                var VarInd;
                for (var listIndex2 = 0; listIndex2 < pCLContr.size() && !bFound; ++listIndex2) {
                    {
                        VarInd = pCLContr.get(listIndex2);
                        if ((VarInd.idVariable === sVarAtr) && (VarInd.index === nivVarAtr)) {
                            bFound = true;
                            VarInd.idVariable = null;
                        }
                    }
                    ;
                }
            };
            return UnificationStack;
        }());
        prolog.UnificationStack = UnificationStack;
        UnificationStack["__class"] = "PrologPlusCG.prolog.UnificationStack";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var UnifyCG = /** @class */ (function () {
            function UnifyCG(myenv) {
                this.e_inComeBranch = 0;
                this.e_outComeBranch = 1;
                if (this.CMatchL === undefined) {
                    this.CMatchL = null;
                }
                if (this.RMatchL === undefined) {
                    this.RMatchL = null;
                }
                this.env = null;
                this.env = myenv;
                this.CMatchL = ([]);
                this.RMatchL = ([]);
            }
            UnifyCG.prototype.CMatchL_MakeEmpty = function () {
                var aCMatch;
                for (var listIndex1 = 0; listIndex1 < /* size */ this.CMatchL.length; listIndex1++) {
                    {
                        aCMatch = /* get */ this.CMatchL[listIndex1];
                        aCMatch.myDestroy();
                    }
                    ;
                }
                /* clear */ (this.CMatchL.length = 0);
            };
            UnifyCG.prototype.RMatchL_MakeEmpty = function () {
                var aRMatch;
                for (var listIndex1 = 0; listIndex1 < /* size */ this.RMatchL.length; ++listIndex1) {
                    {
                        aRMatch = /* get */ this.RMatchL[listIndex1];
                        aRMatch.myDestroy();
                    }
                    ;
                }
                /* clear */ (this.RMatchL.length = 0);
            };
            UnifyCG.prototype.sameNameRel = function (pDataLeft, pDataRight, indexLeft, indexRight) {
                var valIndexLeft = this.env.unification.valueFromUnifStack(pDataLeft, indexLeft);
                var valIndexRight = this.env.unification.valueFromUnifStack(pDataRight, indexRight);
                var bResult = true;
                if ((valIndexLeft.pData == null) && (valIndexRight.pData != null)) {
                    this.env.unification.addConstraint2(valIndexRight.pData, valIndexRight.index, pDataLeft.data, indexLeft);
                }
                else if ((valIndexLeft.pData != null) && (valIndexRight.pData == null)) {
                    this.env.unification.addConstraint2(valIndexLeft.pData, valIndexLeft.index, pDataRight.data, indexRight);
                }
                else if ((valIndexLeft.pData == null) && (valIndexRight.pData == null)) {
                    this.env.unification.addConstraint3(pDataLeft.data, indexLeft, pDataRight.data, indexRight);
                }
                else {
                    var pData1Left = void 0;
                    var pData1Right = void 0;
                    pData1Left = valIndexLeft.pData.data;
                    pData1Right = valIndexRight.pData.data;
                    var strData1 = pData1Left;
                    var strData2 = pData1Right;
                    bResult = strData1 === strData2;
                }
                return bResult;
            };
            UnifyCG.prototype.UnifyGC = function (G1, nivG1, G2, nivG2) {
                var BRes = false;
                if (( /* size */G1.m_vctRelations.length > /* size */ G2.m_vctRelations.length) || !this.bagInclusion(G1.m_vctRelations, G2.m_vctRelations, nivG1, nivG2)) {
                    BRes = false;
                }
                else {
                    BRes = this.computeEntryPointsAndUnify(G1, nivG1, G2, nivG2);
                }
                this.env.unification.makeEmpty_vctContstraints();
                return BRes;
            };
            UnifyCG.prototype.bagInclusion = function (lr1, lr2, nivG1, nivG2) {
                var lst = ([]);
                var rla1 = null;
                var rla2 = null;
                var bFound;
                for (var listIndex1 = 0; listIndex1 < /* size */ lr1.length; ++listIndex1) {
                    {
                        rla1 = /* get */ lr1[listIndex1];
                        bFound = false;
                        for (var listIndex2 = 0; listIndex2 < /* size */ lr2.length && !bFound; ++listIndex2) {
                            {
                                rla2 = /* get */ lr2[listIndex2];
                                if (this.sameNameRel(rla1.m_pdRelationName, rla2.m_pdRelationName, nivG1, nivG2) && !(lst.indexOf((rla2)) >= 0)) {
                                    bFound = true;
                                }
                            }
                            ;
                        }
                        if (bFound) {
                            /* addElement */ (lst.push(rla2) > 0);
                        }
                        else {
                            /* clear */ (lst.length = 0);
                            lst = null;
                            return false;
                        }
                    }
                    ;
                }
                /* clear */ (lst.length = 0);
                lst = null;
                return true;
            };
            UnifyCG.prototype.computeEntryPointsAndUnify = function (G1, levelG1, G2, levelG2) {
                var bResult = false;
                var C1;
                var C2;
                if (( /* size */G1.m_vctConcepts.length === 1) && /* isEmpty */ (G1.m_vctRelations.length == 0)) {
                    C1 = G1.m_vctConcepts[0];
                    for (var listIndex = 0; listIndex < /* size */ G2.m_vctConcepts.length && !bResult; listIndex++) {
                        {
                            C2 = /* get */ G2.m_vctConcepts[listIndex];
                            bResult = this.UnifyConcept(C1, C2, levelG1, levelG2);
                            if (!bResult) {
                                this.env.unification.removeConstraints();
                            }
                        }
                        ;
                    }
                }
                else {
                    var vConcs = ([]);
                    if (this.identRef(G1, levelG1, G2, levelG2, vConcs)) {
                        C1 = vConcs[0];
                        C2 = vConcs[1];
                        bResult = this.unifyWithBack(C1, C2, null, null, G1, levelG1, levelG2);
                        /* clear */ (vConcs.length = 0);
                        vConcs = null;
                    }
                    else {
                        /* clear */ (vConcs.length = 0);
                        var rl1 = G1.m_vctRelations[0];
                        var rl2 = void 0;
                        for (var listIndex2 = 0; listIndex2 < /* size */ G2.m_vctRelations.length && !bResult; listIndex2++) {
                            {
                                rl2 = /* get */ G2.m_vctRelations[listIndex2];
                                if (this.sameNameRel(rl1.m_pdRelationName, rl2.m_pdRelationName, levelG1, levelG2)) {
                                    bResult = this.unifyWithBack(rl1.m_concSource, rl2.m_concSource, rl1.m_concDestination, rl2.m_concDestination, G1, levelG1, levelG2);
                                }
                            }
                            ;
                        }
                    }
                }
                this.CMatchL_MakeEmpty();
                this.RMatchL_MakeEmpty();
                return bResult;
            };
            UnifyCG.prototype.identRef = function (G1, nivG1, G2, nivG2, vConcs) {
                var C1 = null;
                var C2 = null;
                var sRef1;
                var sRef2;
                var bResult = false;
                for (var listIndex1 = 0; listIndex1 < /* size */ G1.m_vctConcepts.length && !bResult; ++listIndex1) {
                    {
                        C1 = /* get */ G1.m_vctConcepts[listIndex1];
                        sRef1 = this.individu(C1.m_pdReferent, nivG1);
                        if (sRef1 != null) {
                            for (var listIndex2 = 0; listIndex2 < /* size */ G2.m_vctConcepts.length && !bResult; ++listIndex2) {
                                {
                                    C2 = /* get */ G2.m_vctConcepts[listIndex2];
                                    sRef2 = this.individu2(C2.m_pdReferent, nivG2);
                                    if ((sRef2 != null) && (typeof sRef2 === 'string')) {
                                        bResult = /* equals */ (function (o1, o2) { return o1 && o1.equals ? o1.equals(o2) : o1 === o2; })(sRef1, sRef2);
                                    }
                                    else if (sRef2 != null && (sRef2 != null && sRef2 instanceof PrologPlusCG.prolog.PrologList)) {
                                        bResult = this.env.compile.hasString(sRef1, sRef2);
                                    }
                                }
                                ;
                            }
                        }
                    }
                    ;
                }
                if (!bResult) {
                    var ensRef1 = void 0;
                    var ensRef2 = null;
                    for (var listIndex3 = 0; listIndex3 < /* size */ G1.m_vctConcepts.length && !bResult; ++listIndex3) {
                        {
                            C1 = /* get */ G1.m_vctConcepts[listIndex3];
                            ensRef1 = this.individu3(C1.m_pdReferent, nivG1);
                            if (ensRef1 != null) {
                                for (var listIndex4 = 0; listIndex4 < /* size */ G2.m_vctConcepts.length && !bResult; ++listIndex4) {
                                    {
                                        C2 = /* get */ G2.m_vctConcepts[listIndex4];
                                        ensRef2 = this.individu3(C2.m_pdReferent, nivG2);
                                        if (ensRef2 != null) {
                                            bResult = this.env.compile.setsAreEqual(ensRef1, ensRef2);
                                        }
                                    }
                                    ;
                                }
                            }
                        }
                        ;
                    }
                }
                if (bResult) {
                    /* addElement */ (vConcs.push(C1) > 0);
                    /* addElement */ (vConcs.push(C2) > 0);
                }
                return bResult;
            };
            UnifyCG.prototype.individu = function (Ref, ind) {
                if (Ref == null) {
                    return null;
                }
                var ValRef = this.env.unification.valueFromUnifStack(Ref, ind);
                if (ValRef.pData == null) {
                    return null;
                }
                else if (typeof ValRef.pData.data === 'string') {
                    return ValRef.pData.data;
                }
                else {
                    return null;
                }
            };
            UnifyCG.prototype.individu2 = function (Ref, ind) {
                if (Ref == null) {
                    return null;
                }
                var ValRef = this.env.unification.valueFromUnifStack(Ref, ind);
                if (ValRef.pData == null) {
                    return null;
                }
                else {
                    return ValRef.pData.data;
                }
            };
            UnifyCG.prototype.individu3 = function (Ref, ind) {
                if (Ref == null) {
                    return null;
                }
                var ValRef = this.env.unification.valueFromUnifStack(Ref, ind);
                if (ValRef.pData == null) {
                    return null;
                }
                else if (ValRef.pData.data != null && ValRef.pData.data instanceof PrologPlusCG.prolog.PrologList) {
                    return ValRef.pData.data;
                }
                else {
                    return null;
                }
            };
            UnifyCG.prototype.unifyWithBack = function (Cs1, Cs2, Ct1, Ct2, G1, levelG1, levelG2) {
                var bResult = this.UnifyConcept(Cs1, Cs2, levelG1, levelG2) && ((Ct1 == null) || this.UnifyConcept(Ct1, Ct2, levelG1, levelG2)) && this.propagateUnifyCG(G1, levelG1, levelG2);
                if (!bResult) {
                    this.env.unification.removeConstraints();
                }
                this.CMatchL_MakeEmpty();
                this.RMatchL_MakeEmpty();
                return bResult;
            };
            UnifyCG.prototype.propagateUnifyCG = function (G1, nivG1, nivG2) {
                var BRes = true;
                var trouve = true;
                while ((BRes && trouve)) {
                    {
                        var E = null;
                        trouve = false;
                        for (var listIndex1 = 0; listIndex1 < /* size */ this.CMatchL.length && !trouve; ++listIndex1) {
                            {
                                E = /* get */ this.CMatchL[listIndex1];
                                trouve = (!E.m_MatchedLocally);
                            }
                            ;
                        }
                        if (trouve) {
                            BRes = this.UnifyBranchs(this.e_outComeBranch, E.m_ConcMatched1, E.m_ConcMatched2, nivG1, nivG2) && this.UnifyBranchs(this.e_inComeBranch, E.m_ConcMatched1, E.m_ConcMatched2, nivG1, nivG2);
                            if (BRes) {
                                E.m_MatchedLocally = true;
                            }
                        }
                    }
                }
                ;
                return (BRes && this.postUnify(G1));
            };
            UnifyCG.prototype.UnifyBranchs = function (BranchDirection, C1, C2, nivG1, nivG2) {
                var bResult = true;
                var rel1;
                var bAlreadyUnified;
                var vRels1 = null;
                if (BranchDirection === this.e_inComeBranch) {
                    vRels1 = C1.m_vctIncomingRelations;
                }
                else {
                    vRels1 = C1.m_vctOutgoingRelations;
                }
                for (var listIndex1 = 0; listIndex1 < /* size */ vRels1.length && bResult; ++listIndex1) {
                    {
                        rel1 = /* get */ vRels1[listIndex1];
                        bAlreadyUnified = false;
                        var E = null;
                        for (var listIndex2 = 0; listIndex2 < /* size */ this.RMatchL.length && !bAlreadyUnified; ++listIndex2) {
                            {
                                E = /* get */ this.RMatchL[listIndex2];
                                bAlreadyUnified = (rel1 === E.m_RelMatched1);
                            }
                            ;
                        }
                        if (!bAlreadyUnified) {
                            bResult = this.UnifyTheBranch(BranchDirection, rel1, C2, nivG1, nivG2);
                        }
                        else {
                            bResult = this.unificationIsValid(BranchDirection, C2, E.m_RelMatched1, E.m_RelMatched2);
                        }
                    }
                    ;
                }
                return bResult;
            };
            UnifyCG.prototype.unificationIsValid = function (BranchDirection, C2, rel1, rel2) {
                var Ca1;
                var Ca2;
                var bResult = false;
                if (BranchDirection === this.e_inComeBranch) {
                    Ca1 = rel1.m_concSource;
                    Ca2 = rel2.m_concSource;
                    bResult = (C2 === rel2.m_concDestination);
                }
                else {
                    Ca1 = rel1.m_concDestination;
                    Ca2 = rel2.m_concDestination;
                    bResult = (C2 === rel2.m_concSource);
                }
                if (bResult) {
                    var E = this.inCMatchL(Ca1, Ca2);
                    if (E != null) {
                        bResult = ((E.m_ConcMatched1 === Ca1) && (E.m_ConcMatched2 === Ca2));
                    }
                    else {
                        bResult = false;
                    }
                }
                return bResult;
            };
            /**
             * Verify that the pair (Ca1, Ca2) exists in concMatchVec
             * @param {PrologPlusCG.cg.Concept} Ca1
             * @param {PrologPlusCG.cg.Concept} Ca2
             * @return {PrologPlusCG.prolog.ConceptUnification}
             */
            UnifyCG.prototype.inCMatchL = function (Ca1, Ca2) {
                var BRes = false;
                var E = null;
                for (var listIndex1 = 0; listIndex1 < /* size */ this.CMatchL.length && !BRes; ++listIndex1) {
                    {
                        E = /* get */ this.CMatchL[listIndex1];
                        if ((E.m_ConcMatched1 === Ca1) || (E.m_ConcMatched2 === Ca2)) {
                            BRes = true;
                        }
                    }
                    ;
                }
                if (BRes) {
                    return E;
                }
                else {
                    return null;
                }
            };
            UnifyCG.prototype.UnifyTheBranch = function (BranchDirection, rel1, C2, nivG1, nivG2) {
                var BRes = false;
                var rel2 = null;
                var vRels;
                if (BranchDirection === this.e_inComeBranch) {
                    vRels = C2.m_vctIncomingRelations;
                }
                else {
                    vRels = C2.m_vctOutgoingRelations;
                }
                for (var listIndex1 = 0; listIndex1 < /* size */ vRels.length && !BRes; ++listIndex1) {
                    {
                        rel2 = /* get */ vRels[listIndex1];
                        if (this.sameNameRel(rel1.m_pdRelationName, rel2.m_pdRelationName, nivG1, nivG2)) {
                            BRes = true;
                        }
                    }
                    ;
                }
                if (BRes) {
                    var bAlreadyUnified = false;
                    var Er = void 0;
                    for (var listIndex2 = 0; listIndex2 < /* size */ this.RMatchL.length && !bAlreadyUnified; ++listIndex2) {
                        {
                            Er = /* get */ this.RMatchL[listIndex2];
                            bAlreadyUnified = (rel2 === Er.m_RelMatched2);
                        }
                        ;
                    }
                    if (bAlreadyUnified) {
                        return false;
                    }
                    var Ca1 = void 0;
                    var Ca2 = void 0;
                    Ca1 = Ca2 = null;
                    if (BranchDirection === this.e_inComeBranch) {
                        Ca1 = rel1.m_concSource;
                        Ca2 = rel2.m_concSource;
                    }
                    else {
                        Ca1 = rel1.m_concDestination;
                        Ca2 = rel2.m_concDestination;
                    }
                    var E = this.inCMatchL(Ca1, Ca2);
                    if (E != null) {
                        BRes = ((E.m_ConcMatched1 === Ca1) && (E.m_ConcMatched2 === Ca2));
                    }
                    else {
                        BRes = this.UnifyConcept(Ca1, Ca2, nivG1, nivG2);
                    }
                    if (BRes) {
                        /* addElement */ (this.RMatchL.push(new PrologPlusCG.prolog.RelationUnification(rel1, rel2)) > 0);
                    }
                }
                return BRes;
            };
            UnifyCG.prototype.postUnify = function (G1) {
                var BRes = true;
                var R;
                for (var listIndex1 = 0; listIndex1 < /* size */ G1.m_vctRelations.length && BRes; ++listIndex1) {
                    {
                        R = /* get */ G1.m_vctRelations[listIndex1];
                        BRes = false;
                        var er = void 0;
                        for (var listIndex2 = 0; listIndex2 < /* size */ this.RMatchL.length && !BRes; ++listIndex2) {
                            {
                                er = /* get */ this.RMatchL[listIndex2];
                                BRes = (R === er.m_RelMatched1);
                            }
                            ;
                        }
                    }
                    ;
                }
                return BRes;
            };
            UnifyCG.prototype.UnifyConcept = function (C1, C2, nivG1, nivG2) {
                var BRes = false;
                if (this.UnifyConc(C1, C2, nivG1, nivG2)) {
                    /* addElement */ (this.CMatchL.push(new PrologPlusCG.prolog.ConceptUnification(C1, C2, false)) > 0);
                    BRes = true;
                }
                return BRes;
            };
            UnifyCG.prototype.UnifyConc = function (C1, C2, nivG1, nivG2) {
                var BRes = true;
                if ((C1.m_pdType == null) || (C2.m_pdType == null)) {
                    var Don1 = null;
                    var Don2 = null;
                    if (C1.m_pdType == null) {
                        Don1 = C1.m_pdReferent;
                    }
                    else {
                        Don1 = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uConcept, C1);
                    }
                    if (C2.m_pdType == null) {
                        Don2 = C2.m_pdReferent;
                    }
                    else {
                        Don2 = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uConcept, C2);
                    }
                    BRes = this.env.unification.unify(Don1, nivG1, Don2, nivG2);
                }
                else {
                    var Type3 = this.UnifyTyp(C1.m_pdType, C2.m_pdType, nivG1, nivG2);
                    BRes = !(Type3 === ("Absurd")) && this.UnifyRef(C1.m_pdReferent, C2.m_pdReferent, nivG1, nivG2) && this.conform(C2.m_pdReferent, nivG2, Type3) && this.UnifyValue(C1.m_pdValue, C2.m_pdValue, nivG1, nivG2);
                }
                return BRes;
            };
            UnifyCG.prototype.UnifyTyp = function (pDonGch, pDonDrt, indGch, indDrt) {
                var ValIndGch = this.env.unification.valueFromUnifStack(pDonGch, indGch);
                var ValIndDrt = this.env.unification.valueFromUnifStack(pDonDrt, indDrt);
                var Type3 = null;
                if ((ValIndGch.pData == null) && (ValIndDrt.pData != null)) {
                    this.env.unification.addConstraint2(ValIndDrt.pData, ValIndDrt.index, pDonGch.data, indGch);
                    Type3 = ValIndDrt.pData.data;
                }
                else if ((ValIndGch.pData != null) && (ValIndDrt.pData == null)) {
                    this.env.unification.addConstraint2(ValIndGch.pData, ValIndGch.index, pDonDrt.data, indDrt);
                    Type3 = ValIndGch.pData.data;
                }
                else if ((ValIndGch.pData == null) && (ValIndDrt.pData == null)) {
                    this.env.unification.addConstraint3(pDonGch.data, indGch, pDonDrt.data, indDrt);
                }
                else {
                    var pDon1Gch = void 0;
                    var pDon1Drt = void 0;
                    pDon1Gch = ValIndGch.pData.data;
                    pDon1Drt = ValIndDrt.pData.data;
                    var sDon1 = pDon1Gch;
                    var sDon2 = pDon1Drt;
                    if (this.env.typeHierarchy == null) {
                        throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified (a CG operation needs it).");
                    }
                    if (sDon1 === sDon2) {
                        Type3 = sDon1;
                    }
                    else {
                        Type3 = this.env.typeHierarchy.maxComSubType(sDon1, sDon2);
                    }
                }
                if (Type3 == null) {
                    console.info("Warning: At least one of the types should be a specific type.");
                    Type3 = "Absurd";
                }
                return Type3;
            };
            UnifyCG.prototype.UnifyRef = function (Ref1, Ref2, nivG1, nivG2) {
                if ((Ref1 == null) || (Ref2 == null)) {
                    return true;
                }
                var ValIndGch = this.env.unification.valueFromUnifStack(Ref1, nivG1);
                var ValIndDrt = this.env.unification.valueFromUnifStack(Ref2, nivG2);
                if ((ValIndGch.pData != null) && (ValIndGch.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uIdentifier) && (ValIndGch.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uString) && (ValIndGch.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uSet)) {
                    throw new PrologPlusCG.prolog.ExecException("Error: the referent " + Ref1.data.toString() + "is not a variable, an identifier, a string or a set.");
                }
                if ((ValIndDrt.pData != null) && (ValIndDrt.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uIdentifier) && (ValIndDrt.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uString) && (ValIndDrt.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uSet)) {
                    throw new PrologPlusCG.prolog.ExecException("Error: the referent " + Ref1.data.toString() + "is not a variable, an identifier, a string or a set.");
                }
                if ((ValIndGch.pData != null) && (ValIndDrt.pData != null) && ((ValIndGch.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (ValIndGch.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString)) && (ValIndDrt.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uSet)) {
                    return this.env.compile.hasString(ValIndGch.pData.data, ValIndDrt.pData.data);
                }
                else {
                    return this.env.unification.unify(Ref2, nivG2, Ref1, nivG1);
                }
            };
            UnifyCG.prototype.UnifyValue = function (Val1, Val2, nivG1, nivG2) {
                if ((Val1 == null) || (Val2 == null)) {
                    return true;
                }
                else {
                    return this.env.unification.unify(Val2, nivG2, Val1, nivG1);
                }
            };
            UnifyCG.prototype.conform = function (Ref, niv, Typ) {
                if (Ref == null) {
                    return true;
                }
                var bResult = false;
                var contr = this.env.unification.valueFromUnifStack(Ref, niv);
                if (this.env.typeHierarchy == null) {
                    throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified (a CG operation needs it).");
                }
                if (contr.pData == null) {
                    bResult = true;
                }
                else if (typeof contr.pData.data === 'string') {
                    var st = contr.pData.data;
                    if (st === ("super")) {
                        bResult = true;
                    }
                    else {
                        bResult = this.env.typeHierarchy.isInstanceOf(contr.pData.data, Typ);
                    }
                }
                else {
                    var refEns = contr.pData.data;
                    bResult = true;
                    var tmpData = null;
                    for (var listIndex = 0; listIndex < refEns.size() && bResult; ++listIndex) {
                        {
                            tmpData = refEns.get(listIndex);
                            bResult = this.env.typeHierarchy.isInstanceOf(tmpData.data, Typ);
                        }
                        ;
                    }
                }
                return bResult;
            };
            return UnifyCG;
        }());
        prolog.UnifyCG = UnifyCG;
        UnifyCG["__class"] = "PrologPlusCG.prolog.UnifyCG";
        UnifyCG["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var UnitType = /** @class */ (function () {
            function UnitType(unitee, typUnite) {
                if (this.unit === undefined) {
                    this.unit = null;
                }
                if (this.typUnit === undefined) {
                    this.typUnit = 0;
                }
                this.unit = unitee;
                this.typUnit = typUnite;
            }
            return UnitType;
        }());
        prolog.UnitType = UnitType;
        UnitType["__class"] = "PrologPlusCG.prolog.UnitType";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var VariableIndexPair = /** @class */ (function () {
            function VariableIndexPair(s, i) {
                if (this.idVariable === undefined) {
                    this.idVariable = null;
                }
                if (this.index === undefined) {
                    this.index = 0;
                }
                this.idVariable = s;
                this.index = i;
            }
            return VariableIndexPair;
        }());
        prolog.VariableIndexPair = VariableIndexPair;
        VariableIndexPair["__class"] = "PrologPlusCG.prolog.VariableIndexPair";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var VariableIndexPairList = /** @class */ (function () {
            function VariableIndexPairList() {
                if (this.vec === undefined) {
                    this.vec = null;
                }
                if (this.ValInd === undefined) {
                    this.ValInd = null;
                }
                this.vec = ([]);
                this.ValInd = null;
            }
            VariableIndexPairList.prototype.size = function () {
                return /* size */ this.vec.length;
            };
            VariableIndexPairList.prototype.get = function (index) {
                if (index < /* size */ this.vec.length) {
                    return /* get */ this.vec[index];
                }
                else {
                    return null;
                }
            };
            VariableIndexPairList.prototype.add = function (vip) {
                /* add */ (this.vec.push(vip) > 0);
            };
            VariableIndexPairList.prototype.addElement = function (vip) {
                this.add(vip);
            };
            VariableIndexPairList.prototype.clear = function () {
                /* clear */ (this.vec.length = 0);
            };
            VariableIndexPairList.prototype.isEmpty = function () {
                return /* isEmpty */ (this.vec.length == 0);
            };
            return VariableIndexPairList;
        }());
        prolog.VariableIndexPairList = VariableIndexPairList;
        VariableIndexPairList["__class"] = "PrologPlusCG.prolog.VariableIndexPairList";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var PPCGIO_JS = /** @class */ (function (_super) {
        __extends(PPCGIO_JS, _super);
        function PPCGIO_JS(myenv, strConsoleDOMElementName) {
            var _this = _super.call(this, myenv) || this;
            _this.consoleDOMElement = null;
            if (strConsoleDOMElementName != null && strConsoleDOMElementName !== "") {
                _this.consoleDOMElement = document.querySelector(strConsoleDOMElementName);
            }
            else {
                _this.consoleDOMElement = null;
            }
            return _this;
        }
        PPCGIO_JS.prototype.appendToConsole = function (strToPrint) {
            if (this.consoleDOMElement != null) {
                var realStringToPrint = strToPrint.replace(new RegExp("\n", 'g'), "<br/>");
                this.consoleDOMElement.innerHTML += realStringToPrint;
            }
        };
        PPCGIO_JS.prototype.clearConsole = function () {
            if (this.consoleDOMElement != null) {
                this.consoleDOMElement.innerHTML = "";
            }
        };
        PPCGIO_JS.prototype.setPrompt = function (strToPrint) {
        };
        PPCGIO_JS.prototype.getNextQuery = function () {
            return "";
        };
        PPCGIO_JS.prototype.showMessageDialog = function (strMessage, strTitle) {
            alert(strTitle + ":\n" + strMessage);
        };
        PPCGIO_JS.prototype.showPrompt = function () {
        };
        PPCGIO_JS.prototype.setProgramText = function (strProgram) {
            this.env.setProgramText(strProgram);
        };
        PPCGIO_JS.prototype.readSomething = function (readingMode) {
        };
        return PPCGIO_JS;
    }(PrologPlusCG.prolog.PPCGIO));
    PrologPlusCG.PPCGIO_JS = PPCGIO_JS;
    PPCGIO_JS["__class"] = "PrologPlusCG.PPCGIO_JS";
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var PrologList = /** @class */ (function (_super) {
            __extends(PrologList, _super);
            function PrologList() {
                return _super.call(this, 5, 2) || this;
            }
            PrologList.prototype.myDestroy = function () {
                if (this.size() === 0) {
                    return;
                }
                else {
                    var uneDon = void 0;
                    for (var index = 0; index < this.size(); ++index) {
                        {
                            uneDon = this.get(index);
                            uneDon.myDestroy();
                        }
                        ;
                    }
                    this.clear();
                }
            };
            PrologList.prototype.myCopy = function () {
                var newList = null;
                if (this.size() !== 0) {
                    newList = new PrologList();
                    var aPrologData = void 0;
                    for (var index = 0; index < this.size(); ++index) {
                        {
                            aPrologData = this.get(index);
                            newList.addData(aPrologData.myCopy());
                        }
                        ;
                    }
                }
                return newList;
            };
            PrologList.prototype.getAt = function (i) {
                return this.elementAt(i);
            };
            PrologList.prototype.addData = function (don) {
                this.addElement(don);
            };
            return PrologList;
        }(PrologPlusCG.prolog.PrologDataVector));
        prolog.PrologList = PrologList;
        PrologList["__class"] = "PrologPlusCG.prolog.PrologList";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
(function (PrologPlusCG) {
    var prolog;
    (function (prolog) {
        var PrologTerm = /** @class */ (function (_super) {
            __extends(PrologTerm, _super);
            function PrologTerm() {
                return _super.call(this, 5, 2) || this;
            }
            PrologTerm.prototype.getAt = function (i) {
                return this.elementAt(i);
            };
            PrologTerm.prototype.myDestroy = function () {
                if (this.size() === 0) {
                    return;
                }
                else {
                    this.clear();
                }
            };
            PrologTerm.prototype.myCopy = function () {
                var newTerm = null;
                if (this.size() !== 0) {
                    newTerm = new PrologTerm();
                    var aPrologData = void 0;
                    for (var listIndex = 0; listIndex < this.size(); ++listIndex) {
                        {
                            aPrologData = this.get(listIndex);
                            newTerm.addData(aPrologData.myCopy());
                        }
                        ;
                    }
                }
                return newTerm;
            };
            PrologTerm.prototype.hasOnlyAtoms = function (env) {
                if (this.size() === 0) {
                    return true;
                }
                else {
                    var aPrologData = void 0;
                    for (var listIndex = 0; listIndex < this.size(); ++listIndex) {
                        {
                            aPrologData = this.get(listIndex);
                            if (aPrologData.typeOfData !== PrologPlusCG.prolog.DataTypes.uIdentifier) {
                                return false;
                            }
                            else {
                                var myIdent = aPrologData.data;
                                var bIsVar = env.compile.identifierIsVar(myIdent);
                                if (bIsVar) {
                                    return false;
                                }
                            }
                        }
                        ;
                    }
                    return true;
                }
            };
            PrologTerm.prototype.addData = function (don) {
                this.addElement(don);
            };
            return PrologTerm;
        }(PrologPlusCG.prolog.PrologDataVector));
        prolog.PrologTerm = PrologTerm;
        PrologTerm["__class"] = "PrologPlusCG.prolog.PrologTerm";
    })(prolog = PrologPlusCG.prolog || (PrologPlusCG.prolog = {}));
})(PrologPlusCG || (PrologPlusCG = {}));
