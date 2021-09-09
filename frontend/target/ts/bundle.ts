/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace PrologPlusCG.cg {
    export class CG {
        public m_vctConcepts: Array<PrologPlusCG.cg.Concept>;

        public m_vctRelations: Array<PrologPlusCG.cg.Relation>;

        public constructor(lstConc?: any, lstRel?: any) {
            if (((lstConc != null && (lstConc instanceof Array)) || lstConc === null) && ((lstRel != null && (lstRel instanceof Array)) || lstRel === null)) {
                let __args = arguments;
                if (this.m_vctConcepts === undefined) { this.m_vctConcepts = null; } 
                if (this.m_vctRelations === undefined) { this.m_vctRelations = null; } 
                this.m_vctConcepts = lstConc;
                this.m_vctRelations = lstRel;
            } else if (lstConc === undefined && lstRel === undefined) {
                let __args = arguments;
                if (this.m_vctConcepts === undefined) { this.m_vctConcepts = null; } 
                if (this.m_vctRelations === undefined) { this.m_vctRelations = null; } 
                this.m_vctConcepts = <any>([]);
                this.m_vctRelations = <any>([]);
            } else throw new Error('invalid overload');
        }

        finalize() {
            /* clear */(this.m_vctConcepts.length = 0);
            /* clear */(this.m_vctRelations.length = 0);
            this.m_vctConcepts = null;
            this.m_vctRelations = null;
        }

        /**
         * Elle retourne un CG qui est une copie du CG en question
         * @return {PrologPlusCG.cg.CG}
         */
        public myCopy(): CG {
            const newCG: CG = new CG();
            let listOfConceptPairs: Array<PrologPlusCG.cg.ConceptPair> = <any>([]);
            let conc: PrologPlusCG.cg.Concept;
            let ncept: PrologPlusCG.cg.Concept;
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>this.m_vctConcepts.length); listIndex1++) {{
                conc = /* get */this.m_vctConcepts[listIndex1];
                ncept = conc.myCopy();
                newCG.addConcept(ncept);
                /* addElement */(listOfConceptPairs.push(new PrologPlusCG.cg.ConceptPair(conc, ncept))>0);
            };}
            conc = ncept = null;
            let rela: PrologPlusCG.cg.Relation;
            let nrela: PrologPlusCG.cg.Relation;
            for(let listIndex2: number = 0; listIndex2 < /* size */(<number>this.m_vctRelations.length); ++listIndex2) {{
                rela = <PrologPlusCG.cg.Relation>/* get */this.m_vctRelations[listIndex2];
                nrela = rela.myCopy();
                let couple: PrologPlusCG.cg.ConceptPair;
                let non_trouve1: boolean = true;
                let non_trouve2: boolean = true;
                for(let listIndex3: number = 0; listIndex3 < /* size */(<number>listOfConceptPairs.length) && (non_trouve1 || non_trouve2); ++listIndex3) {{
                    couple = /* get */listOfConceptPairs[listIndex3];
                    if (non_trouve1 && (rela.m_concSource === couple.m_initialConcept)){
                        nrela.m_concSource = couple.m_conceptCopy;
                        nrela.m_concSource.addOutgoingRelation(nrela);
                        non_trouve1 = false;
                    }
                    if (non_trouve2 && (rela.m_concDestination === couple.m_initialConcept)){
                        nrela.m_concDestination = couple.m_conceptCopy;
                        nrela.m_concDestination.addIncomingRelation(nrela);
                        non_trouve2 = false;
                    }
                };}
                newCG.addRelation(nrela);
            };}
            rela = nrela = null;
            /* clear */(listOfConceptPairs.length = 0);
            listOfConceptPairs = null;
            return newCG;
        }

        /**
         * Ajouter un concept au CG
         * @param {PrologPlusCG.cg.Concept} conc
         */
        public addConcept(conc: PrologPlusCG.cg.Concept) {
            /* addElement */(this.m_vctConcepts.push(conc)>0);
        }

        /**
         * Ajouter une relation au CG
         * @param {PrologPlusCG.cg.Relation} rel
         */
        public addRelation(rel: PrologPlusCG.cg.Relation) {
            /* addElement */(this.m_vctRelations.push(rel)>0);
        }

        /**
         * Enlever un concept du CG
         * @param {PrologPlusCG.cg.Concept} conc
         */
        public removeConcept(conc: PrologPlusCG.cg.Concept) {
            /* removeElement */(a => { let index = a.indexOf(conc); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(this.m_vctConcepts);
        }

        /**
         * Enlever une relation du CG
         * @param {PrologPlusCG.cg.Relation} rel
         */
        public removeRelation(rel: PrologPlusCG.cg.Relation) {
            /* removeElement */(a => { let index = a.indexOf(rel); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(this.m_vctRelations);
        }

        public removeSpecialIdent() {
            let conc: PrologPlusCG.cg.Concept;
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>this.m_vctConcepts.length); ++listIndex1) {{
                conc = /* get */this.m_vctConcepts[listIndex1];
                if ((conc.m_pdReferent != null) && (conc.m_pdReferent.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentSpecial)){
                    conc.m_pdReferent = null;
                }
            };}
        }

        public isEmpty(): boolean {
            return ((this.m_vctConcepts == null) || /* isEmpty */(this.m_vctConcepts.length == 0));
        }

        /**
         * MakeEmpty les listes de concepts et relations du CG
         */
        public myDestroy() {
            /* clear */(this.m_vctConcepts.length = 0);
            /* clear */(this.m_vctRelations.length = 0);
            this.m_vctConcepts = null;
            this.m_vctRelations = null;
        }

        public makeEmpty() {
            /* clear */(this.m_vctConcepts.length = 0);
            /* clear */(this.m_vctRelations.length = 0);
        }

        public createRelation(sIdRel: PrologPlusCG.prolog.PrologData, conce_source: PrologPlusCG.cg.Concept, conc_destination: PrologPlusCG.cg.Concept) {
            let nrel: PrologPlusCG.cg.Relation = new PrologPlusCG.cg.Relation(sIdRel, conce_source, conc_destination);
            this.addRelation(nrel);
            nrel = null;
        }
    }
    CG["__class"] = "PrologPlusCG.cg.CG";

}
namespace PrologPlusCG.cg {
    export class CGMatchResult {
        public G3: PrologPlusCG.cg.CG;

        public E3: PrologPlusCG.cg.Concept;

        public constructor(g: PrologPlusCG.cg.CG, c: PrologPlusCG.cg.Concept) {
            if (this.G3 === undefined) { this.G3 = null; }
            if (this.E3 === undefined) { this.E3 = null; }
            this.G3 = g;
            this.E3 = c;
        }

        finalize() {
            this.G3 = null;
            this.E3 = null;
        }
    }
    CGMatchResult["__class"] = "PrologPlusCG.cg.CGMatchResult";

}
namespace PrologPlusCG.cg {
    export class CGOperation implements PrologPlusCG.prolog.DataTypes {
        e_inComeBranch: number;

        e_outComeBranch: number;

        aUnifyCG: PrologPlusCG.prolog.UnifyCG;

        corefMatchVec: Array<PrologPlusCG.cg.CoreferenceMatch>;

        setOpersId: number[];

        concMatchVec: Array<PrologPlusCG.cg.ConceptMatch>;

        relMatchVec: Array<PrologPlusCG.cg.RelationMatch>;

        /*private*/ env: PrologPlusCG.prolog.PPCGEnv;

        public constructor(myenv: PrologPlusCG.prolog.PPCGEnv) {
            this.e_inComeBranch = 0;
            this.e_outComeBranch = 1;
            this.aUnifyCG = null;
            this.corefMatchVec = <any>([]);
            this.setOpersId = [PrologPlusCG.prolog.DataTypes.e_completeContract, PrologPlusCG.prolog.DataTypes.e_partialContract, PrologPlusCG.prolog.DataTypes.e_subsumeWithoutResult];
            if (this.concMatchVec === undefined) { this.concMatchVec = null; }
            if (this.relMatchVec === undefined) { this.relMatchVec = null; }
            this.env = null;
            this.env = myenv;
            this.aUnifyCG = new PrologPlusCG.prolog.UnifyCG(this.env);
            this.concMatchVec = <any>([]);
            this.relMatchVec = <any>([]);
        }

        /*private*/ concMatchVec_MakeEmpty(lst: Array<PrologPlusCG.cg.ConceptMatch>) {
            let aCMatch: PrologPlusCG.cg.ConceptMatch;
            for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(lst); e.hasMoreElements(); ) {{
                aCMatch = <PrologPlusCG.cg.ConceptMatch>e.nextElement();
                aCMatch.myDestroy();
            };}
            /* clear */(lst.length = 0);
        }

        /*private*/ relMatchVec_MakeEmpty(lst: Array<PrologPlusCG.cg.RelationMatch>) {
            let aRMatch: PrologPlusCG.cg.RelationMatch;
            for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(lst); e.hasMoreElements(); ) {{
                aRMatch = <PrologPlusCG.cg.RelationMatch>e.nextElement();
                aRMatch.myDestroy();
            };}
            /* clear */(lst.length = 0);
        }

        public corefMatchVec_MakeEmpty() {
            let aCorefMatch: PrologPlusCG.cg.CoreferenceMatch;
            for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(this.corefMatchVec); e.hasMoreElements(); ) {{
                aCorefMatch = <PrologPlusCG.cg.CoreferenceMatch>e.nextElement();
                aCorefMatch.myDestroy();
            };}
            /* clear */(this.corefMatchVec.length = 0);
        }

        sameNameRel(rla1: PrologPlusCG.prolog.PrologData, niv1: number, rla2: PrologPlusCG.prolog.PrologData, niv2: number): boolean {
            const valIndLeft: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(rla1, niv1);
            const valIndRight: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(rla2, niv2);
            if ((valIndLeft.pData == null) || (valIndRight.pData == null)){
                throw new PrologPlusCG.prolog.ExecException("Error: for CG operations, relations should have specific values\nand not be free variables.");
            }
            let pData1Left: any;
            let pData1Right: any;
            pData1Left = valIndLeft.pData.data;
            pData1Right = valIndRight.pData.data;
            const sDon1: string = <string>pData1Left;
            const sDon2: string = <string>pData1Right;
            return (sDon1 === sDon2);
        }

        public static convertToByte(IdOperGC: string, G3: PrologPlusCG.cg.CG): number {
            let result: number = 0;
            if (IdOperGC === ("maximalJoin")){
                result = PrologPlusCG.prolog.DataTypes.e_maximalJoin;
            } else if (IdOperGC === ("generalize")){
                result = PrologPlusCG.prolog.DataTypes.e_generalize;
            } else if ((IdOperGC === ("subsume")) && (G3 == null)){
                result = PrologPlusCG.prolog.DataTypes.e_subsumeWithoutResult;
            } else if ((IdOperGC === ("subsume")) && (G3 != null)){
                result = PrologPlusCG.prolog.DataTypes.e_subsume;
            }
            return result;
        }

        public matchCG(OperCG: number, E1: PrologPlusCG.cg.Concept, G1: PrologPlusCG.cg.CG, level1: number, E2: PrologPlusCG.cg.Concept, G2: PrologPlusCG.cg.CG, level2: number, resMatchCG: PrologPlusCG.cg.CGMatchResult): boolean {
            let bResult: boolean = false;
            if (((OperCG === PrologPlusCG.prolog.DataTypes.e_project) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsumeWithoutResult) || (OperCG === PrologPlusCG.prolog.DataTypes.e_completeContract)) && ((/* size */(<number>G1.m_vctRelations.length) > /* size */(<number>G2.m_vctRelations.length)) || !this.bagInclusion(G1.m_vctRelations, level1, G2.m_vctRelations, level2))){
                bResult = false;
            } else {
                bResult = this.computeEntryPointsAndMatch(OperCG, E1, G1, level1, E2, G2, level2, resMatchCG);
            }
            return bResult;
        }

        bagInclusion(lr1: Array<PrologPlusCG.cg.Relation>, niv1: number, lr2: Array<PrologPlusCG.cg.Relation>, niv2: number): boolean {
            let lst: Array<PrologPlusCG.cg.Relation> = <any>([]);
            let rla1: PrologPlusCG.cg.Relation = null;
            let rla2: PrologPlusCG.cg.Relation = null;
            let bFound: boolean;
            for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(lr1); e.hasMoreElements(); ) {{
                rla1 = <PrologPlusCG.cg.Relation>e.nextElement();
                bFound = false;
                for(const e1: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(lr2); e1.hasMoreElements() && !bFound; ) {{
                    rla2 = <PrologPlusCG.cg.Relation>e1.nextElement();
                    if (this.sameNameRel(rla1.m_pdRelationName, niv1, rla2.m_pdRelationName, niv2) && !/* contains */(lst.indexOf(<any>(rla2)) >= 0)){
                        bFound = true;
                    }
                };}
                if (bFound){
                    /* addElement */(lst.push(rla2)>0);
                } else {
                    /* clear */(lst.length = 0);
                    lst = null;
                    return false;
                }
            };}
            /* clear */(lst.length = 0);
            lst = null;
            return true;
        }

        computeEntryPointsAndMatch(OperCG: number, E1: PrologPlusCG.cg.Concept, G1: PrologPlusCG.cg.CG, level1: number, E2: PrologPlusCG.cg.Concept, G2: PrologPlusCG.cg.CG, level2: number, resMatchCG: PrologPlusCG.cg.CGMatchResult): boolean {
            let C1: PrologPlusCG.cg.Concept;
            let C2: PrologPlusCG.cg.Concept;
            let bResult: boolean = false;
            if ((E1 != null) && (E2 != null)){
                if (!/* contains */(G1.m_vctConcepts.indexOf(<any>(E1)) >= 0)){
                    throw new PrologPlusCG.prolog.ExecException("Error: the first entry concept is not in the corresponding CG.");
                }
                if (!/* contains */(G2.m_vctConcepts.indexOf(<any>(E2)) >= 0)){
                    throw new PrologPlusCG.prolog.ExecException("Error: the second entry concept is not in the corresponding CG.");
                }
                bResult = this.matchWithBack(OperCG, E1, E2, null, null, G1, level1, G2, level2, resMatchCG.G3);
                if (bResult){
                    const eMatchL: PrologPlusCG.cg.ConceptMatch = this.inCMatchL(E1, E2);
                    resMatchCG.E3 = eMatchL.m_ResultOfMatch;
                }
            } else if ((/* size */(<number>G1.m_vctConcepts.length) === 1) && /* isEmpty */(G1.m_vctRelations.length == 0)){
                C1 = <PrologPlusCG.cg.Concept>/* get */G1.m_vctConcepts[0];
                for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(G2.m_vctConcepts); e.hasMoreElements() && !bResult; ) {{
                    C2 = <PrologPlusCG.cg.Concept>e.nextElement();
                    bResult = this.matchConcept(OperCG, C1, level1, C2, level2, resMatchCG.G3);
                };}
                bResult = bResult && this.postMatch(OperCG, G1, level1, G2, level2, resMatchCG.G3);
            } else if ((/* size */(<number>G2.m_vctConcepts.length) === 1) && /* isEmpty */(G2.m_vctRelations.length == 0)){
                C2 = <PrologPlusCG.cg.Concept>/* get */G2.m_vctConcepts[0];
                for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(G1.m_vctConcepts); e.hasMoreElements() && !bResult; ) {{
                    C1 = <PrologPlusCG.cg.Concept>e.nextElement();
                    bResult = this.matchConcept(OperCG, C1, level1, C2, level2, resMatchCG.G3);
                };}
                bResult = bResult && this.postMatch(OperCG, G1, level1, G2, level2, resMatchCG.G3);
            } else {
                let vConcs: Array<PrologPlusCG.cg.Concept> = <any>([]);
                if ((OperCG !== PrologPlusCG.prolog.DataTypes.e_generalize) && (this.aUnifyCG.identRef(G1, level1, G2, level2, vConcs) || this.varCoref(G1, G2, vConcs))){
                    C1 = <PrologPlusCG.cg.Concept>/* get */vConcs[0];
                    C2 = <PrologPlusCG.cg.Concept>/* elementAt */vConcs[1];
                    bResult = this.matchWithBack(OperCG, C1, C2, null, null, G1, level1, G2, level2, resMatchCG.G3);
                    /* clear */(vConcs.length = 0);
                    vConcs = null;
                } else if ((OperCG === PrologPlusCG.prolog.DataTypes.e_project) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsumeWithoutResult) || (OperCG === PrologPlusCG.prolog.DataTypes.e_completeContract)){
                    /* clear */(vConcs.length = 0);
                    let rl1: PrologPlusCG.cg.Relation;
                    let rl2: PrologPlusCG.cg.Relation;
                    for(const e1: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(G1.m_vctRelations); e1.hasMoreElements() && !bResult; ) {{
                        rl1 = <PrologPlusCG.cg.Relation>e1.nextElement();
                        for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(G2.m_vctRelations); e.hasMoreElements() && !bResult; ) {{
                            rl2 = <PrologPlusCG.cg.Relation>e.nextElement();
                            if (this.sameNameRel(rl1.m_pdRelationName, level1, rl2.m_pdRelationName, level2)){
                                bResult = this.matchWithBack(OperCG, rl1.m_concSource, rl2.m_concSource, rl1.m_concDestination, rl2.m_concDestination, G1, level1, G2, level2, resMatchCG.G3);
                            }
                        };}
                    };}
                } else {
                    /* clear */(vConcs.length = 0);
                    let rl1: PrologPlusCG.cg.Relation;
                    let bRelationFound: boolean = false;
                    for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(G1.m_vctRelations); e.hasMoreElements() && !bResult; ) {{
                        rl1 = <PrologPlusCG.cg.Relation>e.nextElement();
                        let rl2: PrologPlusCG.cg.Relation;
                        for(const e1: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(G2.m_vctRelations); e1.hasMoreElements() && !bResult; ) {{
                            rl2 = <PrologPlusCG.cg.Relation>e1.nextElement();
                            if (this.sameNameRel(rl1.m_pdRelationName, level1, rl2.m_pdRelationName, level2)){
                                bResult = this.matchWithBack(OperCG, rl1.m_concSource, rl2.m_concSource, rl1.m_concDestination, rl2.m_concDestination, G1, level1, G2, level2, resMatchCG.G3);
                                bRelationFound = true;
                            }
                        };}
                    };}
                    if (!bRelationFound){
                        let conc1: PrologPlusCG.cg.Concept;
                        for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(G1.m_vctConcepts); e.hasMoreElements() && !bResult; ) {{
                            conc1 = <PrologPlusCG.cg.Concept>e.nextElement();
                            let conc2: PrologPlusCG.cg.Concept;
                            for(const e1: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(G2.m_vctConcepts); e1.hasMoreElements() && !bResult; ) {{
                                conc2 = <PrologPlusCG.cg.Concept>e1.nextElement();
                                bResult = this.matchConcept(OperCG, conc1, level1, conc2, level2, resMatchCG.G3);
                            };}
                        };}
                        bResult = bResult && this.postMatch(OperCG, G1, level1, G2, level2, resMatchCG.G3);
                    }
                }
            }
            if ((OperCG !== PrologPlusCG.prolog.DataTypes.e_partialContract) && (OperCG !== PrologPlusCG.prolog.DataTypes.e_completeContract)){
                this.concMatchVec_MakeEmpty(this.concMatchVec);
                this.relMatchVec_MakeEmpty(this.relMatchVec);
            }
            return bResult;
        }

        varCoref(G1: PrologPlusCG.cg.CG, G2: PrologPlusCG.cg.CG, vConcs: Array<PrologPlusCG.cg.Concept>): boolean {
            let bResult: boolean = false;
            let C1: PrologPlusCG.cg.Concept = null;
            let C2: PrologPlusCG.cg.Concept = null;
            for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(G1.m_vctConcepts); e.hasMoreElements() && !bResult; ) {{
                C1 = <PrologPlusCG.cg.Concept>e.nextElement();
                let sRef1: string = null;
                if ((C1.m_pdReferent != null) && (typeof C1.m_pdReferent.data === 'string')){
                    sRef1 = <string>C1.m_pdReferent.data;
                }
                if ((sRef1 != null) && this.isCoreferent(C1.m_pdReferent)){
                    let CM: PrologPlusCG.cg.CoreferenceMatch;
                    let trouve: boolean = false;
                    for(const e1: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(this.corefMatchVec); e1.hasMoreElements() && !bResult && !trouve; ) {{
                        CM = <PrologPlusCG.cg.CoreferenceMatch>e1.nextElement();
                        if ((CM.Var1 != null) && (CM.Var1 === sRef1)){
                            trouve = true;
                            for(const e2: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(G2.m_vctConcepts); e2.hasMoreElements() && !bResult; ) {{
                                C2 = <PrologPlusCG.cg.Concept>e2.nextElement();
                                bResult = ((C2.m_pdReferent != null) && (CM.Var2 != null) && (typeof C2.m_pdReferent.data === 'string') && /* equals */(<any>((o1: any, o2: any) => o1 && o1.equals ? o1.equals(o2) : o1 === o2)(CM.Var2,C2.m_pdReferent.data)));
                            };}
                        }
                    };}
                }
            };}
            if (bResult){
                /* addElement */(vConcs.push(C1)>0);
                /* addElement */(vConcs.push(C2)>0);
            }
            return bResult;
        }

        isCoreferent(Ref: PrologPlusCG.prolog.PrologData): boolean {
            if ((Ref != null) && (Ref.typeOfData === PrologPlusCG.prolog.DataTypes.uVariable)){
                return true;
            } else {
                return false;
            }
        }

        matchWithBack(OperCG: number, Cs1: PrologPlusCG.cg.Concept, Cs2: PrologPlusCG.cg.Concept, Ct1: PrologPlusCG.cg.Concept, Ct2: PrologPlusCG.cg.Concept, G1: PrologPlusCG.cg.CG, level1: number, G2: PrologPlusCG.cg.CG, level2: number, G3: PrologPlusCG.cg.CG): boolean {
            let bResult: boolean = false;
            const AncCorefL: Array<PrologPlusCG.cg.CoreferenceMatch> = <any>([]);
            let elm: PrologPlusCG.cg.CoreferenceMatch;
            let Nelm: PrologPlusCG.cg.CoreferenceMatch;
            for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(this.corefMatchVec); e.hasMoreElements(); ) {{
                elm = <PrologPlusCG.cg.CoreferenceMatch>e.nextElement();
                let s1: string = null;
                if (elm.Var1 != null){
                    s1 = elm.Var1;
                }
                let s2: string = null;
                if (elm.Var2 != null){
                    s2 = elm.Var2;
                }
                let s3: string = null;
                if (elm.Var3 != null){
                    s3 = elm.Var3;
                }
                Nelm = new PrologPlusCG.cg.CoreferenceMatch(s1, s2, s3);
                /* addElement */(AncCorefL.push(Nelm)>0);
            };}
            if (this.matchConcept(OperCG, Cs1, level1, Cs2, level2, G3) && ((Ct1 == null) || this.matchConcept(OperCG, Ct1, level1, Ct2, level2, G3)) && this.propagateMatchCG(OperCG, G1, level1, G2, level2, G3)){
                bResult = true;
            } else {
                this.corefMatchVec_MakeEmpty();
                let CorefMTmp: PrologPlusCG.cg.CoreferenceMatch;
                for(const ex: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(AncCorefL); ex.hasMoreElements(); ) {{
                    CorefMTmp = <PrologPlusCG.cg.CoreferenceMatch>ex.nextElement();
                    /* addElement */(this.corefMatchVec.push(CorefMTmp)>0);
                };}
                /* clear */(AncCorefL.length = 0);
                this.concMatchVec_MakeEmpty(this.concMatchVec);
                this.relMatchVec_MakeEmpty(this.relMatchVec);
                if (G3 != null){
                    G3.makeEmpty();
                }
                bResult = false;
            }
            let aCorefMatch: PrologPlusCG.cg.CoreferenceMatch;
            for(const ex: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(AncCorefL); ex.hasMoreElements(); ) {{
                aCorefMatch = <PrologPlusCG.cg.CoreferenceMatch>ex.nextElement();
                aCorefMatch.myDestroy();
            };}
            /* clear */(AncCorefL.length = 0);
            return bResult;
        }

        propagateMatchCG(OperCG: number, G1: PrologPlusCG.cg.CG, niv1: number, G2: PrologPlusCG.cg.CG, niv2: number, G3: PrologPlusCG.cg.CG): boolean {
            let bResult: boolean = true;
            let suite: boolean = true;
            while((bResult && suite)) {{
                let E: PrologPlusCG.cg.ConceptMatch = null;
                suite = false;
                for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(this.concMatchVec); e.hasMoreElements() && !suite; ) {{
                    E = <PrologPlusCG.cg.ConceptMatch>e.nextElement();
                    suite = (E.m_IsConcMatched && !E.m_IsMatchedLocally);
                };}
                if (!suite){
                    for(const e1: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(this.concMatchVec); e1.hasMoreElements() && !suite; ) {{
                        E = <PrologPlusCG.cg.ConceptMatch>e1.nextElement();
                        suite = !E.m_IsConcMatched;
                    };}
                }
                if (suite){
                    if (!E.m_IsConcMatched){
                        bResult = this.matchConceptS(OperCG, E.m_ConcMatched1, niv1, E.m_ConcMatched2, niv2);
                    }
                    if (bResult){
                        bResult = this.matchBranches(this.e_outComeBranch, OperCG, E.m_ConcMatched1, niv1, E.m_ConcMatched2, niv2, E.m_ResultOfMatch, G3) && this.matchBranches(this.e_inComeBranch, OperCG, E.m_ConcMatched1, niv1, E.m_ConcMatched2, niv2, E.m_ResultOfMatch, G3);
                        if (bResult){
                            E.m_IsMatchedLocally = true;
                        }
                    }
                }
            }};
            return (bResult && this.postMatch(OperCG, G1, niv1, G2, niv2, G3));
        }

        matchBranches(BranchDirection: number, OperCG: number, C1: PrologPlusCG.cg.Concept, level1: number, C2: PrologPlusCG.cg.Concept, level2: number, C3: PrologPlusCG.cg.Concept, G3: PrologPlusCG.cg.CG): boolean {
            let bResult: boolean = true;
            let rel1: PrologPlusCG.cg.Relation;
            let bAlreadyMatched: boolean;
            let vctRels1: Array<PrologPlusCG.cg.Relation> = null;
            if (BranchDirection === this.e_inComeBranch){
                vctRels1 = C1.m_vctIncomingRelations;
            } else {
                vctRels1 = C1.m_vctOutgoingRelations;
            }
            for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(vctRels1); e.hasMoreElements() && bResult; ) {{
                rel1 = <PrologPlusCG.cg.Relation>e.nextElement();
                bAlreadyMatched = false;
                let E: PrologPlusCG.cg.RelationMatch = null;
                for(const e1: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(this.relMatchVec); e1.hasMoreElements() && !bAlreadyMatched; ) {{
                    E = <PrologPlusCG.cg.RelationMatch>e1.nextElement();
                    bAlreadyMatched = (rel1 === E.m_RelMatched1);
                };}
                if (!bAlreadyMatched){
                    bResult = this.matchTheBranch(BranchDirection, OperCG, rel1, C2, C3, G3, level1, level2);
                } else {
                    bResult = this.unificationIsValid(BranchDirection, C2, E.m_RelMatched1, E.m_RelMatched2);
                }
            };}
            return bResult;
        }

        unificationIsValid(BranchDirection: number, C2: PrologPlusCG.cg.Concept, rel1: PrologPlusCG.cg.Relation, rel2: PrologPlusCG.cg.Relation): boolean {
            let Ca1: PrologPlusCG.cg.Concept;
            let Ca2: PrologPlusCG.cg.Concept;
            let bResult: boolean = false;
            if (BranchDirection === this.e_inComeBranch){
                Ca1 = rel1.m_concSource;
                Ca2 = rel2.m_concSource;
                bResult = (C2 === rel2.m_concDestination);
            } else {
                Ca1 = rel1.m_concDestination;
                Ca2 = rel2.m_concDestination;
                bResult = (C2 === rel2.m_concSource);
            }
            if (bResult){
                const E: PrologPlusCG.cg.ConceptMatch = this.inCMatchL(Ca1, Ca2);
                if (E == null){
                    bResult = false;
                }
            }
            return bResult;
        }

        /**
         * Verify that the pair (Ca1, Ca2) exists in concMatchVec
         * @param {PrologPlusCG.cg.Concept} Ca1
         * @param {PrologPlusCG.cg.Concept} Ca2
         * @return {PrologPlusCG.cg.ConceptMatch}
         */
        inCMatchL(Ca1: PrologPlusCG.cg.Concept, Ca2: PrologPlusCG.cg.Concept): PrologPlusCG.cg.ConceptMatch {
            let bResult: boolean = false;
            let E: PrologPlusCG.cg.ConceptMatch = null;
            for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(this.concMatchVec); e.hasMoreElements() && !bResult; ) {{
                E = <PrologPlusCG.cg.ConceptMatch>e.nextElement();
                if ((E.m_ConcMatched1 === Ca1) && (E.m_ConcMatched2 === Ca2)){
                    bResult = true;
                }
            };}
            if (bResult){
                return E;
            } else {
                return null;
            }
        }

        matchTheBranch(BranchDirection: number, OperCG: number, rel1: PrologPlusCG.cg.Relation, C2: PrologPlusCG.cg.Concept, C3: PrologPlusCG.cg.Concept, G3: PrologPlusCG.cg.CG, niv1: number, niv2: number): boolean {
            let bResult: boolean = false;
            let rel2: PrologPlusCG.cg.Relation = null;
            let vRels: Array<PrologPlusCG.cg.Relation>;
            if (BranchDirection === this.e_inComeBranch){
                vRels = C2.m_vctIncomingRelations;
            } else {
                vRels = C2.m_vctOutgoingRelations;
            }
            for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(vRels); !bResult && e.hasMoreElements(); ) {{
                rel2 = <PrologPlusCG.cg.Relation>e.nextElement();
                if (this.sameNameRel(rel1.m_pdRelationName, niv1, rel2.m_pdRelationName, niv2)){
                    bResult = true;
                }
                if (bResult){
                    let bAlreadyMatched: boolean = false;
                    let Er: PrologPlusCG.cg.RelationMatch;
                    for(const e1: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(this.relMatchVec); e1.hasMoreElements() && !bAlreadyMatched; ) {{
                        Er = <PrologPlusCG.cg.RelationMatch>e1.nextElement();
                        bAlreadyMatched = (rel2 === Er.m_RelMatched2);
                    };}
                    if (bAlreadyMatched){
                        bResult = false;
                    }
                }
                if (bResult){
                    let Ca1: PrologPlusCG.cg.Concept;
                    let Ca2: PrologPlusCG.cg.Concept;
                    let Ca3: PrologPlusCG.cg.Concept;
                    Ca1 = Ca2 = Ca3 = null;
                    if (BranchDirection === this.e_inComeBranch){
                        Ca1 = rel1.m_concSource;
                        Ca2 = rel2.m_concSource;
                    } else {
                        Ca1 = rel1.m_concDestination;
                        Ca2 = rel2.m_concDestination;
                    }
                    const E: PrologPlusCG.cg.ConceptMatch = this.inCMatchL(Ca1, Ca2);
                    if (E != null){
                        bResult = ((E.m_ConcMatched1 === Ca1) && (E.m_ConcMatched2 === Ca2));
                    } else {
                        bResult = this.matchConcept(OperCG, Ca1, niv1, Ca2, niv2, G3);
                    }
                    if (bResult){
                        /* addElement */(this.relMatchVec.push(new PrologPlusCG.cg.RelationMatch(rel1, rel2))>0);
                        if (!this.in(OperCG, this.setOpersId, 2)){
                            let El: PrologPlusCG.cg.ConceptMatch;
                            for(const e4: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(this.concMatchVec); e4.hasMoreElements() && (Ca3 == null); ) {{
                                El = <PrologPlusCG.cg.ConceptMatch>e4.nextElement();
                                if ((Ca1 === El.m_ConcMatched1) && (Ca2 === El.m_ConcMatched2)){
                                    Ca3 = El.m_ResultOfMatch;
                                }
                            };}
                            const Rp: PrologPlusCG.cg.Relation = new PrologPlusCG.cg.Relation();
                            let ValRel1: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(rel1.m_pdRelationName, niv1);
                            Rp.m_pdRelationName = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, ValRel1.pData.data);
                            ValRel1 = null;
                            if (BranchDirection === this.e_inComeBranch){
                                Rp.m_concSource = Ca3;
                                Rp.m_concDestination = C3;
                                /* addElement */(Ca3.m_vctOutgoingRelations.push(Rp)>0);
                                /* addElement */(C3.m_vctIncomingRelations.push(Rp)>0);
                            } else {
                                Rp.m_concSource = C3;
                                Rp.m_concDestination = Ca3;
                                /* addElement */(C3.m_vctOutgoingRelations.push(Rp)>0);
                                /* addElement */(Ca3.m_vctIncomingRelations.push(Rp)>0);
                            }
                            /* addElement */(G3.m_vctRelations.push(Rp)>0);
                        }
                    }
                }
            };}
            if (!bResult){
                if ((OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin)){
                    bResult = true;
                }
            }
            return bResult;
        }

        postMatch(OperCG: number, G1: PrologPlusCG.cg.CG, niv1: number, G2: PrologPlusCG.cg.CG, niv2: number, G3: PrologPlusCG.cg.CG): boolean {
            let bResult: boolean = true;
            switch((OperCG)) {
            case 31 /* e_maximalJoin */:
                this.addBranches(PrologPlusCG.prolog.DataTypes.e_maximalJoin, G1, niv1, G2, niv2, G3);
                break;
            case 30 /* e_project */:
            case 33 /* e_subsume */:
            case 34 /* e_subsumeWithoutResult */:
            case 35 /* e_completeContract */:
                {
                    let R: PrologPlusCG.cg.Relation;
                    for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(G1.m_vctRelations); e.hasMoreElements() && bResult; ) {{
                        R = <PrologPlusCG.cg.Relation>e.nextElement();
                        bResult = false;
                        let er: PrologPlusCG.cg.RelationMatch;
                        for(const e1: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(this.relMatchVec); e1.hasMoreElements() && !bResult; ) {{
                            er = <PrologPlusCG.cg.RelationMatch>e1.nextElement();
                            bResult = (R === er.m_RelMatched1);
                        };}
                    };}
                };
                break;
            }
            return bResult;
        }

        addBranches(m: number, G1: PrologPlusCG.cg.CG, niv1: number, G2: PrologPlusCG.cg.CG, niv2: number, G3: PrologPlusCG.cg.CG) {
            if (m === PrologPlusCG.prolog.DataTypes.e_maximalJoin){
                this.addBranchsOfCG(G1, niv1, 1, G3);
                this.addBranchsOfCG(G2, niv2, 2, G3);
            }
        }

        addBranchsOfCG(G: PrologPlusCG.cg.CG, niv: number, N: number, Gt: PrologPlusCG.cg.CG) {
            let C: PrologPlusCG.cg.Concept;
            for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(G.m_vctConcepts); e.hasMoreElements(); ) {{
                C = <PrologPlusCG.cg.Concept>e.nextElement();
                let Cc: PrologPlusCG.cg.Concept;
                let Cck: PrologPlusCG.cg.Concept;
                Cc = this.matchedConc(C, niv, N, Gt);
                let R: PrologPlusCG.cg.Relation;
                for(const e1: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(C.m_vctIncomingRelations); e1.hasMoreElements(); ) {{
                    R = <PrologPlusCG.cg.Relation>e1.nextElement();
                    if (!this.matchedRel(R, N)){
                        const Ck: PrologPlusCG.cg.Concept = R.m_concSource;
                        Cck = this.matchedConc(Ck, niv, N, Gt);
                        this.addRel(N, Cck, R, niv, Cc, Gt);
                    }
                };}
                for(const e2: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(C.m_vctOutgoingRelations); e2.hasMoreElements(); ) {{
                    R = <PrologPlusCG.cg.Relation>e2.nextElement();
                    if (!this.matchedRel(R, N)){
                        const Ck: PrologPlusCG.cg.Concept = R.m_concDestination;
                        Cck = this.matchedConc(Ck, niv, N, Gt);
                        this.addRel(N, Cc, R, niv, Cck, Gt);
                    }
                };}
            };}
        }

        matchedRel(R: PrologPlusCG.cg.Relation, N: number): boolean {
            let r: PrologPlusCG.cg.RelationMatch;
            for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(this.relMatchVec); e.hasMoreElements(); ) {{
                r = <PrologPlusCG.cg.RelationMatch>e.nextElement();
                if (((N === 1) && (r.m_RelMatched1 === R)) || ((N === 2) && (r.m_RelMatched2 === R))){
                    return true;
                }
            };}
            return false;
        }

        matchedConc(C: PrologPlusCG.cg.Concept, niv: number, N: number, Gt: PrologPlusCG.cg.CG): PrologPlusCG.cg.Concept {
            let ec: PrologPlusCG.cg.ConceptMatch;
            for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(this.concMatchVec); e.hasMoreElements(); ) {{
                ec = <PrologPlusCG.cg.ConceptMatch>e.nextElement();
                if ((N === 1) && (ec.m_ConcMatched1 === C)){
                    return ec.m_ResultOfMatch;
                } else if ((N === 2) && (ec.m_ConcMatched2 === C)){
                    return ec.m_ResultOfMatch;
                }
            };}
            return this.addConc(N, C, niv, Gt);
        }

        addConc(N: number, C: PrologPlusCG.cg.Concept, niv: number, Gt: PrologPlusCG.cg.CG): PrologPlusCG.cg.Concept {
            let Cp: PrologPlusCG.cg.Concept = null;
            if (C.m_pdType == null){
                const ValRef: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(C.m_pdReferent, niv);
                if (ValRef.pData == null){
                    throw new PrologPlusCG.prolog.ExecException("Error: The concept to be added should be a specific concept, not a free variable.");
                } else {
                    const cTmp: PrologPlusCG.cg.Concept = <PrologPlusCG.cg.Concept>ValRef.pData.data;
                    Cp = cTmp.copyValue(niv);
                }
            } else {
                Cp = C.copyValue(niv);
            }
            /* addElement */(Gt.m_vctConcepts.push(Cp)>0);
            let M: PrologPlusCG.cg.ConceptMatch = null;
            if (N === 1){
                M = new PrologPlusCG.cg.ConceptMatch(C, Cp, Cp, true, false);
            } else {
                M = new PrologPlusCG.cg.ConceptMatch(Cp, C, Cp, true, false);
            }
            /* addElement */(this.concMatchVec.push(M)>0);
            return Cp;
        }

        addRel(N: number, CP: PrologPlusCG.cg.Concept, R: PrologPlusCG.cg.Relation, niv: number, CF: PrologPlusCG.cg.Concept, Gt: PrologPlusCG.cg.CG) {
            const Rp: PrologPlusCG.cg.Relation = new PrologPlusCG.cg.Relation();
            const ValRel: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(R.m_pdRelationName, niv);
            const sRel: string = <string>ValRel.pData.data;
            Rp.m_pdRelationName = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, sRel);
            Rp.m_concSource = CP;
            Rp.m_concDestination = CF;
            /* addElement */(CP.m_vctOutgoingRelations.push(Rp)>0);
            /* addElement */(CF.m_vctIncomingRelations.push(Rp)>0);
            /* addElement */(Gt.m_vctRelations.push(Rp)>0);
            let M: PrologPlusCG.cg.RelationMatch = null;
            if (N === 1){
                M = new PrologPlusCG.cg.RelationMatch(R, null);
            } else {
                M = new PrologPlusCG.cg.RelationMatch(null, R);
            }
            /* addElement */(this.relMatchVec.push(M)>0);
        }

        matchConcept(OperCG: number, C1: PrologPlusCG.cg.Concept, niv1: number, C2: PrologPlusCG.cg.Concept, niv2: number, G3: PrologPlusCG.cg.CG): boolean {
            let bResult: boolean = true;
            let C3: PrologPlusCG.cg.Concept = null;
            if ((C1.m_pdValue != null) && (C1.m_pdValue.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) && (C2.m_pdValue != null) && (C2.m_pdValue.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)){
                if (!this.in(OperCG, this.setOpersId, 2)){
                    C3 = new PrologPlusCG.cg.Concept(this.env);
                }
                if (this.matchType(OperCG, C1.m_pdType, niv1, C2.m_pdType, niv2, C3)){
                    const M: PrologPlusCG.cg.ConceptMatch = new PrologPlusCG.cg.ConceptMatch(C1, C2, C3, false, false);
                    /* addElement */(this.concMatchVec.push(M)>0);
                    if (C3 != null){
                        /* addElement */(G3.m_vctConcepts.push(C3)>0);
                    }
                } else {
                    bResult = false;
                }
            } else {
                let resMatch: PrologPlusCG.cg.ConceptMatchResult = this.matchConc(OperCG, C1, niv1, C2, niv2);
                if (resMatch.bRes){
                    C3 = resMatch.C3;
                    const M: PrologPlusCG.cg.ConceptMatch = new PrologPlusCG.cg.ConceptMatch(C1, C2, C3, true, false);
                    /* addElement */(this.concMatchVec.push(M)>0);
                    if (C3 != null){
                        /* addElement */(G3.m_vctConcepts.push(C3)>0);
                    }
                } else {
                    bResult = false;
                }
                resMatch = null;
            }
            C3 = null;
            return bResult;
        }

        matchConceptS(OperCG: number, C1: PrologPlusCG.cg.Concept, level1: number, C2: PrologPlusCG.cg.Concept, level2: number): boolean {
            let bResult: boolean = true;
            const resMatch: PrologPlusCG.cg.ConceptMatchResult = this.matchConc(OperCG, C1, level1, C2, level2);
            const C3: PrologPlusCG.cg.Concept = resMatch.C3;
            if (resMatch.bRes){
                let E: PrologPlusCG.cg.ConceptMatch = null;
                let ec: PrologPlusCG.cg.ConceptMatch;
                for(const e1: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(this.concMatchVec); e1.hasMoreElements() && (E == null); ) {{
                    ec = <PrologPlusCG.cg.ConceptMatch>e1.nextElement();
                    if ((ec.m_ConcMatched1 === C1) && (ec.m_ConcMatched2 === C2)){
                        E = ec;
                    }
                };}
                E.m_IsConcMatched = true;
                if (C3 != null){
                    this.copyDataCept(C3, E.m_ResultOfMatch);
                }
            } else {
                bResult = false;
            }
            return bResult;
        }

        copyDataCept(C1: PrologPlusCG.cg.Concept, C2: PrologPlusCG.cg.Concept) {
            C2.m_pdType = C1.m_pdType.myCopy();
            if (C1.m_pdReferent != null){
                C2.m_pdReferent = C1.m_pdReferent.myCopy();
            }
            if (C1.m_pdValue != null){
                C2.m_pdValue = C1.m_pdValue.myCopy();
            }
        }

        matchConc(OperCG: number, C1: PrologPlusCG.cg.Concept, niv1: number, C2: PrologPlusCG.cg.Concept, niv2: number): PrologPlusCG.cg.ConceptMatchResult {
            let C3: PrologPlusCG.cg.Concept = null;
            let bResult: boolean = true;
            if (!this.in(OperCG, this.setOpersId, 2)){
                C3 = new PrologPlusCG.cg.Concept(this.env);
            }
            switch((OperCG)) {
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
                    const Typ1: string = <string>C1.m_pdType.data;
                    const Typ2: string = <string>C2.m_pdType.data;
                    C3.m_pdType = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, "match(" + Typ1 + "," + Typ2 + ")");
                    C3.m_pdReferent = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, "matchedReferent");
                };
                break;
            }
            return new PrologPlusCG.cg.ConceptMatchResult(bResult, C3);
        }

        matchType(OperCG: number, Type1: PrologPlusCG.prolog.PrologData, level1: number, Type2: PrologPlusCG.prolog.PrologData, level2: number, C3: PrologPlusCG.cg.Concept): boolean {
            let Type3: string = null;
            let bResult: boolean = false;
            const valIndLeft: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(Type1, level1);
            const valIndRight: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(Type2, level2);
            if ((valIndLeft.pData == null) || (valIndRight.pData == null)){
                throw new PrologPlusCG.prolog.ExecException("Error: for CG operations, types shoud have specific values.");
            } else {
                let pData1Left: any;
                let pData1Right: any;
                pData1Left = valIndLeft.pData.data;
                pData1Right = valIndRight.pData.data;
                const sData1: string = <string>pData1Left;
                const sData2: string = <string>pData1Right;
                if (this.env.typeHierarchy == null){
                    throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified (a CG operation needs it).");
                }
                switch((OperCG)) {
                case 31 /* e_maximalJoin */:
                    {
                        if (sData1 === sData2){
                            Type3 = sData1;
                        } else {
                            Type3 = this.env.typeHierarchy.maxComSubType(sData1, sData2);
                        }
                        bResult = (!(Type3 === ("Absurd")));
                    };
                    break;
                case 33 /* e_subsume */:
                    {
                        bResult = this.env.typeHierarchy.isSubType(sData2, sData1);
                        Type3 = sData2;
                    };
                    break;
                case 34 /* e_subsumeWithoutResult */:
                case 36 /* e_partialContract */:
                case 35 /* e_completeContract */:
                    bResult = this.env.typeHierarchy.isSubType(sData2, sData1);
                    break;
                case 32 /* e_generalize */:
                    {
                        if (sData1 === sData2){
                            Type3 = sData1;
                        } else {
                            Type3 = this.env.typeHierarchy.minComSuperType(sData1, sData2);
                        }
                        bResult = (!(Type3 === ("Universal")) && !(Type3 === ("UNIVERSAL")));
                    };
                    break;
                default:
                    throw new PrologPlusCG.prolog.ExecException("Error : CG Operation not predefined.");
                }
                if (bResult && (Type3 != null)){
                    C3.m_pdType = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, Type3);
                }
            }
            return bResult;
        }

        matchRef(OperCG: number, Ref1: PrologPlusCG.prolog.PrologData, niv1: number, Ref2: PrologPlusCG.prolog.PrologData, niv2: number, C3: PrologPlusCG.cg.Concept): boolean {
            let bResult: boolean = this.LocaliseOrAdd(OperCG, Ref1, Ref2, C3);
            if (!bResult){
                return bResult;
            }
            let valIndLeft: PrologPlusCG.prolog.PrologDataIndexPair;
            if (Ref1 != null){
                valIndLeft = this.env.unification.valueFromUnifStack(Ref1, niv1);
            } else {
                valIndLeft = null;
            }
            let valIndRight: PrologPlusCG.prolog.PrologDataIndexPair;
            if (Ref2 != null){
                valIndRight = this.env.unification.valueFromUnifStack(Ref2, niv2);
            } else {
                valIndRight = null;
            }
            if (((Ref1 == null) || (valIndLeft.pData == null) || ((typeof Ref1.data === 'string') && ((<string>Ref1.data) === ("super")))) && ((Ref2 == null) || (valIndRight.pData == null) || ((typeof Ref2.data === 'string') && ((<string>Ref2.data) === ("super"))))){
                bResult = true;
            } else {
                if ((valIndLeft != null) && (valIndLeft.pData != null) && (valIndRight != null) && (valIndRight.pData != null)){
                    if (((valIndLeft.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uIdentifier) && (valIndLeft.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uString) && (valIndLeft.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uSet)) || ((valIndRight.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uIdentifier) && (valIndRight.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uString) && (valIndRight.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uSet))){
                        throw new PrologPlusCG.prolog.ExecException("Error: the referent " + Ref1.data.toString() + " or " + Ref2.data.toString() + " is not an identifier or a string or a set.");
                    } else if ((typeof valIndLeft.pData.data === 'string') && (typeof valIndRight.pData.data === 'string')){
                        const sval1: string = <string>valIndLeft.pData.data;
                        const sval2: string = <string>valIndRight.pData.data;
                        if (sval1 === sval2){
                            if ((OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize)){
                                C3.m_pdReferent = valIndLeft.pData.myCopy();
                            }
                        } else if (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize){
                            C3.m_pdReferent = null;
                        } else {
                            bResult = false;
                        }
                    } else if ((valIndLeft.pData.data != null && valIndLeft.pData.data instanceof <any>PrologPlusCG.prolog.PrologList) && (valIndRight.pData.data != null && valIndRight.pData.data instanceof <any>PrologPlusCG.prolog.PrologList)){
                        const setVal1: PrologPlusCG.prolog.PrologList = <PrologPlusCG.prolog.PrologList>valIndLeft.pData.data;
                        const setVal2: PrologPlusCG.prolog.PrologList = <PrologPlusCG.prolog.PrologList>valIndRight.pData.data;
                        let setVal3: PrologPlusCG.prolog.PrologList = null;
                        if (OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin){
                            setVal3 = this.env.compile.union(setVal1, setVal2);
                            C3.m_pdReferent = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uSet, setVal3);
                            bResult = this.aUnifyCG.conform(C3.m_pdReferent, valIndLeft.index, <string>C3.m_pdType.data);
                        } else if (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize){
                            setVal3 = this.env.compile.intersection(setVal1, setVal2);
                            C3.m_pdReferent = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uSet, setVal3);
                        } else if ((OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsumeWithoutResult) || (OperCG === PrologPlusCG.prolog.DataTypes.e_partialContract) || (OperCG === PrologPlusCG.prolog.DataTypes.e_completeContract)){
                            if (this.env.compile.set1IsSubsetOfSet2(setVal1, setVal2)){
                                if (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume){
                                    C3.m_pdReferent = valIndRight.pData.myCopy();
                                }
                            } else {
                                bResult = false;
                            }
                        }
                    } else if ((typeof valIndLeft.pData.data === 'string') && (valIndRight.pData.data != null && valIndRight.pData.data instanceof <any>PrologPlusCG.prolog.PrologList)){
                        const sVal1: string = <string>valIndLeft.pData.data;
                        const setVal2: PrologPlusCG.prolog.PrologList = <PrologPlusCG.prolog.PrologList>valIndRight.pData.data;
                        let setVal3: PrologPlusCG.prolog.PrologList = null;
                        if (OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin){
                            setVal3 = this.env.compile.union(valIndLeft.pData, setVal2);
                            C3.m_pdReferent = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uSet, setVal3);
                            bResult = this.aUnifyCG.conform(C3.m_pdReferent, valIndLeft.index, <string>C3.m_pdType.data);
                        } else if (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize){
                            if (this.env.compile.hasString(sVal1, setVal2)){
                                C3.m_pdReferent = valIndLeft.pData.myCopy();
                            } else {
                                C3.m_pdReferent = null;
                            }
                        } else if ((OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsumeWithoutResult) || (OperCG === PrologPlusCG.prolog.DataTypes.e_partialContract) || (OperCG === PrologPlusCG.prolog.DataTypes.e_completeContract)){
                            if (this.env.compile.hasString(sVal1, setVal2)){
                                if (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume){
                                    C3.m_pdReferent = valIndRight.pData.myCopy();
                                }
                            } else {
                                bResult = false;
                            }
                        }
                    } else if ((valIndLeft.pData.data != null && valIndLeft.pData.data instanceof <any>PrologPlusCG.prolog.PrologList) && (typeof valIndRight.pData.data === 'string')){
                        const setVal1: PrologPlusCG.prolog.PrologList = <PrologPlusCG.prolog.PrologList>valIndLeft.pData.data;
                        const sVal2: string = <string>valIndRight.pData.data;
                        let setVal3: PrologPlusCG.prolog.PrologList = null;
                        if (OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin){
                            setVal3 = this.env.compile.union(valIndRight.pData, setVal1);
                            C3.m_pdReferent = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uSet, setVal3);
                            bResult = this.aUnifyCG.conform(C3.m_pdReferent, valIndLeft.index, <string>C3.m_pdType.data);
                        } else if (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize){
                            if (this.env.compile.hasString(sVal2, setVal1)){
                                C3.m_pdReferent = valIndRight.pData.myCopy();
                            } else {
                                C3.m_pdReferent = null;
                            }
                        } else if ((OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsumeWithoutResult) || (OperCG === PrologPlusCG.prolog.DataTypes.e_partialContract) || (OperCG === PrologPlusCG.prolog.DataTypes.e_completeContract)){
                            if ((setVal1.size() === 1) && this.env.compile.hasString(sVal2, setVal1)){
                                if (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume){
                                    C3.m_pdReferent = valIndRight.pData.myCopy();
                                }
                            } else {
                                bResult = false;
                            }
                        }
                    }
                } else {
                    switch((OperCG)) {
                    case 31 /* e_maximalJoin */:
                        {
                            if ((valIndLeft != null) && (valIndLeft.pData != null)){
                                C3.m_pdReferent = valIndLeft.pData.myCopy();
                                bResult = this.aUnifyCG.conform(C3.m_pdReferent, valIndLeft.index, <string>C3.m_pdType.data);
                            } else if ((valIndRight != null) && (valIndRight.pData != null)){
                                C3.m_pdReferent = valIndRight.pData.myCopy();
                                bResult = this.aUnifyCG.conform(C3.m_pdReferent, valIndRight.index, <string>C3.m_pdType.data);
                            }
                        };
                        break;
                    case 33 /* e_subsume */:
                        {
                            if ((Ref1 == null) || ((typeof Ref1.data === 'string') && ((<string>Ref1.data) === ("super"))) || (valIndLeft.pData == null)){
                                C3.m_pdReferent = valIndRight.pData.myCopy();
                            } else {
                                bResult = false;
                            }
                        };
                        break;
                    case 34 /* e_subsumeWithoutResult */:
                    case 36 /* e_partialContract */:
                    case 35 /* e_completeContract */:
                        bResult = ((Ref1 == null) || ((typeof Ref1.data === 'string') && ((<string>Ref1.data) === ("super"))) || (valIndLeft.pData == null));
                        break;
                    case 32 /* e_generalize */:
                        bResult = true;
                        break;
                    }
                }
            }
            return bResult;
        }

        matchValue(OperCG: number, Val1: PrologPlusCG.prolog.PrologData, level1: number, Val2: PrologPlusCG.prolog.PrologData, level2: number, C3: PrologPlusCG.cg.Concept): boolean {
            let bResult: boolean = true;
            let valIndLeft: PrologPlusCG.prolog.PrologDataIndexPair;
            if (Val1 != null){
                valIndLeft = this.env.unification.valueFromUnifStack(Val1, level1);
            } else {
                valIndLeft = null;
            }
            let valIndRight: PrologPlusCG.prolog.PrologDataIndexPair;
            if (Val2 != null){
                valIndRight = this.env.unification.valueFromUnifStack(Val2, level2);
            } else {
                valIndRight = null;
            }
            if (((Val1 == null) || (valIndLeft.pData == null)) && ((Val2 == null) || (valIndRight.pData == null))){
                bResult = true;
            } else {
                if ((valIndLeft != null) && (valIndLeft.pData != null) && (valIndRight != null) && (valIndRight.pData != null)){
                    if ((valIndLeft.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) && (valIndRight.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)){
                        const sval1: PrologPlusCG.cg.CG = <PrologPlusCG.cg.CG>valIndLeft.pData.data;
                        const sval2: PrologPlusCG.cg.CG = <PrologPlusCG.cg.CG>valIndRight.pData.data;
                        let resMatchCG: PrologPlusCG.cg.CGMatchResult = new PrologPlusCG.cg.CGMatchResult(new PrologPlusCG.cg.CG(), null);
                        let operCGImb: CGOperation = new CGOperation(this.env);
                        bResult = operCGImb.matchCG(OperCG, null, sval1, level1, null, sval2, level2, resMatchCG);
                        operCGImb = null;
                        if (bResult && ((OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize))){
                            C3.m_pdValue = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uCG, resMatchCG.G3);
                        }
                        resMatchCG = null;
                    } else if (this.valuesAreEqual(valIndLeft.pData, valIndRight.pData)){
                        if ((OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin) || (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume) || (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize)){
                            C3.m_pdValue = new PrologPlusCG.prolog.PrologData(valIndLeft.pData.typeOfData, valIndRight.pData.data);
                        }
                    } else if (OperCG === PrologPlusCG.prolog.DataTypes.e_generalize){
                        C3.m_pdValue = null;
                    } else {
                        bResult = false;
                    }
                } else {
                    switch((OperCG)) {
                    case 31 /* e_maximalJoin */:
                        {
                            if ((valIndLeft != null) && (valIndLeft.pData != null)){
                                C3.m_pdValue = new PrologPlusCG.prolog.PrologData(valIndLeft.pData.typeOfData, valIndLeft.pData.data);
                            } else if ((valIndRight != null) && (valIndRight.pData != null)){
                                C3.m_pdValue = new PrologPlusCG.prolog.PrologData(valIndRight.pData.typeOfData, valIndRight.pData.data);
                            }
                        };
                        break;
                    case 33 /* e_subsume */:
                        {
                            bResult = ((Val1 == null) || (valIndLeft.pData == null));
                            C3.m_pdValue = new PrologPlusCG.prolog.PrologData(valIndRight.pData.typeOfData, valIndRight.pData.data);
                        };
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
        }

        valuesAreEqual(Val1: PrologPlusCG.prolog.PrologData, Val2: PrologPlusCG.prolog.PrologData): boolean {
            if ((Val1.typeOfData !== Val2.typeOfData) || !/* equals */(<any>((o1: any, o2: any) => o1 && o1.equals ? o1.equals(o2) : o1 === o2)(Val1.data,Val2.data))){
                return false;
            } else {
                return true;
            }
        }

        LocaliseOrAdd(OperCG: number, Ref1: PrologPlusCG.prolog.PrologData, Ref2: PrologPlusCG.prolog.PrologData, C3: PrologPlusCG.cg.Concept): boolean {
            let BRes: boolean = true;
            let existe: boolean = false;
            let sRef1: string = null;
            let sRef2: string = null;
            if ((Ref1 != null) && (typeof Ref1.data === 'string')){
                sRef1 = <string>Ref1.data;
            }
            if ((Ref2 != null) && (typeof Ref2.data === 'string')){
                sRef2 = <string>Ref2.data;
            }
            if ((sRef1 == null) && (sRef2 == null)){
                return true;
            }
            let E: PrologPlusCG.cg.CoreferenceMatch = null;
            for(const e: any = /* elements */((a) => { var i = 0; return { nextElement: function() { return i<a.length?a[i++]:null; }, hasMoreElements: function() { return i<a.length; }}})(this.corefMatchVec); e.hasMoreElements() && !existe; ) {{
                E = <PrologPlusCG.cg.CoreferenceMatch>e.nextElement();
                existe = ((sRef1 != null) && (E.Var1 != null) && (E.Var1 === sRef1)) || ((sRef2 != null) && (E.Var2 != null) && (E.Var2 === sRef2));
            };}
            if (existe){
                if ((sRef1 != null) && (E.Var1 != null)){
                    BRes = E.Var1 === sRef1;
                }
                if (BRes && (sRef2 != null) && (E.Var2 != null)){
                    BRes = E.Var2 === sRef2;
                }
                if (BRes){
                    if ((E.Var3 != null) && !this.in(OperCG, this.setOpersId, 2)){
                        C3.m_pdReferent = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uVariable, E.Var3);
                    }
                }
            } else if (this.isCoreferent(Ref1) || this.isCoreferent(Ref2)){
                if (OperCG === PrologPlusCG.prolog.DataTypes.e_subsume){
                    if ((sRef1 != null) && (sRef2 == null)){
                        BRes = false;
                    } else {
                        C3.m_pdReferent = Ref2.myCopy();
                        /* addElement */(this.corefMatchVec.push(new PrologPlusCG.cg.CoreferenceMatch(sRef1, sRef2, <string>C3.m_pdReferent.data))>0);
                    }
                } else if (OperCG === PrologPlusCG.prolog.DataTypes.e_maximalJoin){
                    if (this.isCoreferent(Ref1)){
                        C3.m_pdReferent = Ref1.myCopy();
                    } else {
                        C3.m_pdReferent = Ref2.myCopy();
                    }
                    /* addElement */(this.corefMatchVec.push(new PrologPlusCG.cg.CoreferenceMatch(sRef1, sRef2, <string>C3.m_pdReferent.data))>0);
                }
            }
            return BRes;
        }

        in(v: number, vctByte: number[], indLastElem: number): boolean {
            let bFound: boolean = false;
            for(let i: number = 0; (i <= indLastElem) && !bFound; i++) {{
                bFound = (vctByte[i] === v);
            };}
            return bFound;
        }
    }
    CGOperation["__class"] = "PrologPlusCG.cg.CGOperation";
    CGOperation["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];


}
namespace PrologPlusCG.cg {
    export class Concept implements PrologPlusCG.prolog.DataTypes {
        public m_pdType: PrologPlusCG.prolog.PrologData;

        public m_pdReferent: PrologPlusCG.prolog.PrologData;

        public m_pdValue: PrologPlusCG.prolog.PrologData;

        public m_vctIncomingRelations: Array<PrologPlusCG.cg.Relation>;

        public m_vctOutgoingRelations: Array<PrologPlusCG.cg.Relation>;

        /*private*/ env: PrologPlusCG.prolog.PPCGEnv;

        public constructor(Typ?: any, Ref?: any, Val?: any, myenv?: any) {
            if (((Typ != null && Typ instanceof <any>PrologPlusCG.prolog.PrologData) || Typ === null) && ((Ref != null && Ref instanceof <any>PrologPlusCG.prolog.PrologData) || Ref === null) && ((Val != null && Val instanceof <any>PrologPlusCG.prolog.PrologData) || Val === null) && ((myenv != null && myenv instanceof <any>PrologPlusCG.prolog.PPCGEnv) || myenv === null)) {
                let __args = arguments;
                if (this.m_pdType === undefined) { this.m_pdType = null; } 
                if (this.m_pdReferent === undefined) { this.m_pdReferent = null; } 
                if (this.m_pdValue === undefined) { this.m_pdValue = null; } 
                if (this.m_vctIncomingRelations === undefined) { this.m_vctIncomingRelations = null; } 
                if (this.m_vctOutgoingRelations === undefined) { this.m_vctOutgoingRelations = null; } 
                this.env = null;
                this.env = myenv;
                this.m_pdType = Typ;
                this.m_pdReferent = Ref;
                this.m_pdValue = Val;
                this.m_vctIncomingRelations = <any>([]);
                this.m_vctOutgoingRelations = <any>([]);
            } else if (((Typ != null && Typ instanceof <any>PrologPlusCG.prolog.PPCGEnv) || Typ === null) && Ref === undefined && Val === undefined && myenv === undefined) {
                let __args = arguments;
                let myenv: any = __args[0];
                if (this.m_pdType === undefined) { this.m_pdType = null; } 
                if (this.m_pdReferent === undefined) { this.m_pdReferent = null; } 
                if (this.m_pdValue === undefined) { this.m_pdValue = null; } 
                if (this.m_vctIncomingRelations === undefined) { this.m_vctIncomingRelations = null; } 
                if (this.m_vctOutgoingRelations === undefined) { this.m_vctOutgoingRelations = null; } 
                this.env = null;
                this.env = myenv;
                this.m_pdType = null;
                this.m_pdReferent = null;
                this.m_pdValue = null;
                this.m_vctIncomingRelations = <any>([]);
                this.m_vctOutgoingRelations = <any>([]);
            } else throw new Error('invalid overload');
        }

        finalize() {
            this.m_pdType = null;
            this.m_pdReferent = null;
            this.m_pdValue = null;
            /* clear */(this.m_vctIncomingRelations.length = 0);
            /* clear */(this.m_vctOutgoingRelations.length = 0);
        }

        public myCopy(): Concept {
            const nouvConc: Concept = new Concept(this.env);
            nouvConc.m_pdType = this.m_pdType.myCopy();
            if (this.m_pdReferent != null){
                nouvConc.m_pdReferent = this.m_pdReferent.myCopy();
            }
            if (this.m_pdValue != null){
                nouvConc.m_pdValue = this.m_pdValue.myCopy();
            }
            return nouvConc;
        }

        public copyValue(level: number): Concept {
            const newConcept: Concept = new Concept(this.env);
            const ValType: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(this.m_pdType, level);
            newConcept.m_pdType = ValType.pData.myCopy();
            if (this.m_pdReferent != null){
                const ValRef: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(this.m_pdReferent, level);
                if (ValRef.pData != null){
                    newConcept.m_pdReferent = ValRef.pData.myCopy();
                }
            }
            if (this.m_pdValue != null){
                const ValVal: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(this.m_pdValue, level);
                if (ValVal.pData != null){
                    newConcept.m_pdValue = ValVal.pData.myCopy();
                }
            }
            return newConcept;
        }

        /**
         * Ajouter une relation en entr?e au concept
         * @param {PrologPlusCG.cg.Relation} rel
         */
        public addIncomingRelation(rel: PrologPlusCG.cg.Relation) {
            /* addElement */(this.m_vctIncomingRelations.push(rel)>0);
        }

        /**
         * Ajouter une relation en entr?e au concept
         * @param {PrologPlusCG.cg.Relation} rel
         */
        public addOutgoingRelation(rel: PrologPlusCG.cg.Relation) {
            /* addElement */(this.m_vctOutgoingRelations.push(rel)>0);
        }

        /**
         * Enlever une relation en sortie du concept
         * @param {PrologPlusCG.cg.Relation} rel
         */
        public removeOutgoingRelation(rel: PrologPlusCG.cg.Relation) {
            /* removeElement */(a => { let index = a.indexOf(rel); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(this.m_vctOutgoingRelations);
        }

        /**
         * Enlever une relation en entr?e du concept
         * @param {PrologPlusCG.cg.Relation} rel
         */
        public removeIncomingRelation(rel: PrologPlusCG.cg.Relation) {
            /* removeElement */(a => { let index = a.indexOf(rel); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(this.m_vctIncomingRelations);
        }
    }
    Concept["__class"] = "PrologPlusCG.cg.Concept";
    Concept["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];


}
namespace PrologPlusCG.cg {
    export class ConceptMatch {
        m_ConcMatched1: PrologPlusCG.cg.Concept;

        m_ConcMatched2: PrologPlusCG.cg.Concept;

        m_ResultOfMatch: PrologPlusCG.cg.Concept;

        m_IsConcMatched: boolean;

        m_IsMatchedLocally: boolean;

        constructor(C1: PrologPlusCG.cg.Concept, C2: PrologPlusCG.cg.Concept, C3: PrologPlusCG.cg.Concept, B1: boolean, B2: boolean) {
            if (this.m_ConcMatched1 === undefined) { this.m_ConcMatched1 = null; }
            if (this.m_ConcMatched2 === undefined) { this.m_ConcMatched2 = null; }
            if (this.m_ResultOfMatch === undefined) { this.m_ResultOfMatch = null; }
            if (this.m_IsConcMatched === undefined) { this.m_IsConcMatched = false; }
            if (this.m_IsMatchedLocally === undefined) { this.m_IsMatchedLocally = false; }
            this.m_ConcMatched1 = C1;
            this.m_ConcMatched2 = C2;
            this.m_ResultOfMatch = C3;
            this.m_IsConcMatched = B1;
            this.m_IsMatchedLocally = B2;
        }

        myDestroy() {
            this.m_ConcMatched1 = null;
            this.m_ConcMatched2 = null;
            this.m_ResultOfMatch = null;
        }
    }
    ConceptMatch["__class"] = "PrologPlusCG.cg.ConceptMatch";

}
namespace PrologPlusCG.cg {
    export class ConceptMatchResult {
        public bRes: boolean;

        public C3: PrologPlusCG.cg.Concept;

        constructor(b: boolean, c: PrologPlusCG.cg.Concept) {
            if (this.bRes === undefined) { this.bRes = false; }
            if (this.C3 === undefined) { this.C3 = null; }
            this.bRes = b;
            this.C3 = c;
        }
    }
    ConceptMatchResult["__class"] = "PrologPlusCG.cg.ConceptMatchResult";

}
namespace PrologPlusCG.cg {
    export class ConceptPair {
        m_initialConcept: PrologPlusCG.cg.Concept;

        m_conceptCopy: PrologPlusCG.cg.Concept;

        public constructor(conc1?: any, conc2?: any) {
            if (((conc1 != null && conc1 instanceof <any>PrologPlusCG.cg.Concept) || conc1 === null) && ((conc2 != null && conc2 instanceof <any>PrologPlusCG.cg.Concept) || conc2 === null)) {
                let __args = arguments;
                if (this.m_initialConcept === undefined) { this.m_initialConcept = null; } 
                if (this.m_conceptCopy === undefined) { this.m_conceptCopy = null; } 
                this.m_initialConcept = conc1;
                this.m_conceptCopy = conc2;
            } else if (conc1 === undefined && conc2 === undefined) {
                let __args = arguments;
                if (this.m_initialConcept === undefined) { this.m_initialConcept = null; } 
                if (this.m_conceptCopy === undefined) { this.m_conceptCopy = null; } 
            } else throw new Error('invalid overload');
        }
    }
    ConceptPair["__class"] = "PrologPlusCG.cg.ConceptPair";

}
namespace PrologPlusCG.cg {
    export class CoreferenceMatch {
        Var1: string;

        Var2: string;

        Var3: string;

        constructor(v1: string, v2: string, v3: string) {
            if (this.Var1 === undefined) { this.Var1 = null; }
            if (this.Var2 === undefined) { this.Var2 = null; }
            if (this.Var3 === undefined) { this.Var3 = null; }
            this.Var1 = v1;
            this.Var2 = v2;
            this.Var3 = v3;
        }

        myDestroy() {
            this.Var1 = null;
            this.Var2 = null;
            this.Var3 = null;
        }
    }
    CoreferenceMatch["__class"] = "PrologPlusCG.cg.CoreferenceMatch";

}
namespace PrologPlusCG.cg {
    export class Relation {
        public m_pdRelationName: PrologPlusCG.prolog.PrologData;

        public m_concSource: PrologPlusCG.cg.Concept;

        public m_concDestination: PrologPlusCG.cg.Concept;

        public constructor(IdRel?: any, concSrce?: any, concDest?: any) {
            if (((IdRel != null && IdRel instanceof <any>PrologPlusCG.prolog.PrologData) || IdRel === null) && ((concSrce != null && concSrce instanceof <any>PrologPlusCG.cg.Concept) || concSrce === null) && ((concDest != null && concDest instanceof <any>PrologPlusCG.cg.Concept) || concDest === null)) {
                let __args = arguments;
                if (this.m_pdRelationName === undefined) { this.m_pdRelationName = null; } 
                if (this.m_concSource === undefined) { this.m_concSource = null; } 
                if (this.m_concDestination === undefined) { this.m_concDestination = null; } 
                this.m_pdRelationName = IdRel;
                this.m_concSource = concSrce;
                this.m_concDestination = concDest;
                this.m_concSource.addOutgoingRelation(this);
                this.m_concDestination.addIncomingRelation(this);
            } else if (IdRel === undefined && concSrce === undefined && concDest === undefined) {
                let __args = arguments;
                if (this.m_pdRelationName === undefined) { this.m_pdRelationName = null; } 
                if (this.m_concSource === undefined) { this.m_concSource = null; } 
                if (this.m_concDestination === undefined) { this.m_concDestination = null; } 
                this.m_pdRelationName = null;
                this.m_concSource = null;
                this.m_concDestination = null;
            } else throw new Error('invalid overload');
        }

        public myCopy(): Relation {
            const newRelation: Relation = new Relation();
            newRelation.m_pdRelationName = this.m_pdRelationName.myCopy();
            return newRelation;
        }

        finalize() {
            this.m_pdRelationName = null;
            this.m_concSource = null;
            this.m_concDestination = null;
        }
    }
    Relation["__class"] = "PrologPlusCG.cg.Relation";

}
namespace PrologPlusCG.cg {
    export class RelationMatch {
        m_RelMatched1: PrologPlusCG.cg.Relation;

        m_RelMatched2: PrologPlusCG.cg.Relation;

        constructor(r1: PrologPlusCG.cg.Relation, r2: PrologPlusCG.cg.Relation) {
            if (this.m_RelMatched1 === undefined) { this.m_RelMatched1 = null; }
            if (this.m_RelMatched2 === undefined) { this.m_RelMatched2 = null; }
            this.m_RelMatched1 = r1;
            this.m_RelMatched2 = r2;
        }

        myDestroy() {
            this.m_RelMatched1 = null;
            this.m_RelMatched2 = null;
        }
    }
    RelationMatch["__class"] = "PrologPlusCG.cg.RelationMatch";

}
namespace PrologPlusCG {
    export class PPCGJS {
        env: PrologPlusCG.prolog.PPCGEnv;

        io: PrologPlusCG.PPCGIO_JS;

        public constructor(strConsoleElementDOMSelector?: any) {
            if (((typeof strConsoleElementDOMSelector === 'string') || strConsoleElementDOMSelector === null)) {
                let __args = arguments;
                this.env = null;
                this.io = null;
                this.init(strConsoleElementDOMSelector);
            } else if (strConsoleElementDOMSelector === undefined) {
                let __args = arguments;
                this.env = null;
                this.io = null;
                this.init("#console");
            } else throw new Error('invalid overload');
        }

        /*private*/ init(strConsoleElementDOMSelector: string) {
            this.env = new PrologPlusCG.prolog.PPCGEnv();
            this.io = new PrologPlusCG.PPCGIO_JS(this.env, strConsoleElementDOMSelector);
            this.env.io = this.io;
        }

        public getErrorMessage(): string {
            return this.env.getAndClearErrorMessage();
        }

        public compileProgram(program: string): boolean {
            this.env.PurgeMemory();
            this.io.setProgramText(program);
            return this.env.compileProgram();
        }

        public getResolutions(query: string, bConvertResults: boolean): Array<any> {
            return this.env.Resolve$java_lang_String$boolean(query, bConvertResults);
        }

        /**
         * Execute the query, and if there were any resolutions, return true, otherwise, return false.
         * @param {string} query The goal to execute.
         * @return {boolean} true iff there was at least one result.
         */
        public runQuery(query: string): boolean {
            const result: Array<any> = this.getResolutions(query, true);
            if (result != null){
                return true;
            } else {
                return false;
            }
        }
    }
    PPCGJS["__class"] = "PrologPlusCG.PPCGJS";

}
namespace PrologPlusCG.prolog {
    export class Compile implements PrologPlusCG.prolog.DataTypes {
        /**
         * Variables globales pour readChar()
         */
        public CompileTxt: string;

        public textEndIndex: number;

        curChar: string;

        public curCharIndex: number;

        public curLineNumber: number;

        token: { str: string, toString: Function }

        nTokenType: number;

        public valSysSP: string;

        public valSysINST: string;

        public valSysGEN: string;

        public valSysIdVar: string;

        public valSysCleCG: string;

        public valSysCleBtCp: string;

        public vctUnitTyp: Array<PrologPlusCG.prolog.UnitType>;

        currElem: number;

        vctVariableIdentifiersInQuery: Array<string>;

        /*private*/ env: PrologPlusCG.prolog.PPCGEnv;

        constructor(myenv: PrologPlusCG.prolog.PPCGEnv) {
            if (this.CompileTxt === undefined) { this.CompileTxt = null; }
            if (this.textEndIndex === undefined) { this.textEndIndex = 0; }
            this.curChar = ' ';
            this.curCharIndex = 0;
            this.curLineNumber = 1;
            if (this.token === undefined) { this.token = null; }
            if (this.nTokenType === undefined) { this.nTokenType = 0; }
            this.valSysSP = "#$SP$#";
            this.valSysINST = "#$INST$#";
            this.valSysGEN = "#$GEN$#";
            this.valSysIdVar = "#$VAR1$#";
            this.valSysCleCG = "#$CG$#";
            this.valSysCleBtCp = "#$BtCp$#";
            this.vctUnitTyp = <any>([]);
            this.currElem = 0;
            this.vctVariableIdentifiersInQuery = <any>([]);
            this.env = null;
            this.env = myenv;
        }

        identifierIsVar(ident: string): boolean {
            let bIsVar: boolean;
            if (ident.length >= 2){
                bIsVar = (/* isDigit *//\d/.test(ident.charAt(1)[0]) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(ident.charAt(1)) == '_'.charCodeAt(0)) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(ident.charAt(0)) == '_'.charCodeAt(0)));
            } else {
                bIsVar = true;
            }
            return bIsVar;
        }

        /**
         * a) Lexical analysis
         * @return {string}
         */
        nextChar(): string {
            return this.CompileTxt.charAt(this.curCharIndex);
        }

        public readChar() {
            if (this.curCharIndex === this.textEndIndex){
                this.curChar = '\n';
                throw new PrologPlusCG.prolog.CompileException("End Of Text");
            }
            this.curChar = this.CompileTxt.charAt(this.curCharIndex);
            this.curCharIndex++;
            let ignorer: boolean = true;
            while((ignorer)) {{
                try {
                    while(((((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '\n'.charCodeAt(0)) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '\r'.charCodeAt(0))) && (this.curCharIndex < this.textEndIndex))) {{
                        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '\n'.charCodeAt(0))this.curLineNumber++;
                        this.curChar = this.CompileTxt.charAt(this.curCharIndex);
                        this.curCharIndex++;
                    }};
                } catch(sioobe) {
                    throw new PrologPlusCG.prolog.CompileException("StringIndexOutOfBoundsException");
                }
                if (((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '/'.charCodeAt(0)) && (this.curCharIndex < this.textEndIndex) && ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.CompileTxt.charAt(this.curCharIndex)) == '/'.charCodeAt(0))){
                    try {
                        while((((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) != '\n'.charCodeAt(0)) && (this.curCharIndex < this.textEndIndex))) {{
                            this.curChar = this.CompileTxt.charAt(this.curCharIndex);
                            this.curCharIndex++;
                        }};
                        this.curLineNumber++;
                    } catch(sioobe) {
                        throw new PrologPlusCG.prolog.CompileException("StringIndexOutOfBoundsException");
                    }
                }
                if (this.curCharIndex === this.textEndIndex){
                    ignorer = false;
                } else if (((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '\r'.charCodeAt(0) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '\n'.charCodeAt(0)))){
                    ignorer = true;
                } else if (((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '/'.charCodeAt(0)) && ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.CompileTxt.charAt(this.curCharIndex)) == '/'.charCodeAt(0))){
                    ignorer = true;
                } else {
                    ignorer = false;
                }
            }};
        }

        eatWhiteSpace() {
            this.readChar();
            while((((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == ' '.charCodeAt(0)) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '\n'.charCodeAt(0)) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '\t'.charCodeAt(0)) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '\r'.charCodeAt(0)))) {this.readChar()};
        }

        static isSpaceChar(c: string): boolean {
            return ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) == ' '.charCodeAt(0)) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) == '\n'.charCodeAt(0)) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) == '\r'.charCodeAt(0)) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) == '\t'.charCodeAt(0));
        }

        isIdVar(): boolean {
            if (/* length */this.token.str.length >= 2){
                return (/* isDigit *//\d/.test(/* charAt */this.token.str.charAt(1)[0]) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(/* charAt */this.token.str.charAt(1)) == '_'.charCodeAt(0)) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(/* charAt */this.token.str.charAt(0)) == '_'.charCodeAt(0)));
            } else {
                return true;
            }
        }

        readToken(bGenerateCode: boolean) {
            if (bGenerateCode){
                if (this.currElem === /* size */(<number>this.vctUnitTyp.length)){
                    throw new PrologPlusCG.prolog.CompileException("End Of Text");
                }
                this.token = (<PrologPlusCG.prolog.UnitType>/* elementAt */this.vctUnitTyp[this.currElem]).unit;
                this.nTokenType = (<PrologPlusCG.prolog.UnitType>/* elementAt */this.vctUnitTyp[this.currElem]).typUnit;
                this.currElem++;
                return;
            }
            this.token = { str: "", toString: function() { return this.str; } };
            if (Compile.isSpaceChar(this.curChar) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '\t'.charCodeAt(0)) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '\r'.charCodeAt(0))){
                this.eatWhiteSpace();
            }
            if (/* isLetter *//[a-zA-Z]/.test(this.curChar[0])){
                /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                try {
                    this.readChar();
                    while((/* isLetterOrDigit *//[a-zA-Z\d]/.test(this.curChar[0]) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '_'.charCodeAt(0)))) {{
                        /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                        this.readChar();
                    }};
                } catch(e1) {
                    if (!(e1.message === ("End Of Text"))){
                        throw new PrologPlusCG.prolog.CompileException("Error during the reading of an identifier " + /* toString */this.token.str + " at line " + this.curLineNumber);
                    }
                }
                if (this.isIdVar()){
                    this.nTokenType = PrologPlusCG.prolog.DataTypes.uVariable;
                } else {
                    let uniteStr: string = this.token.str;
                    uniteStr = uniteStr.toLowerCase();
                    if ((uniteStr === ("true")) || (uniteStr === ("false"))){
                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uBoolean;
                        this.token = { str: uniteStr, toString: function() { return this.str; } };
                    } else {
                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uIdentifier;
                    }
                    uniteStr = null;
                }
            } else if ((((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '-'.charCodeAt(0)) && /* isDigit *//\d/.test(this.nextChar()[0])) || /* isDigit *//\d/.test(this.curChar[0])){
                /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                try {
                    this.readChar();
                    while((/* isDigit *//\d/.test(this.curChar[0]))) {{
                        /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                        this.readChar();
                    }};
                    if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '.'.charCodeAt(0)){
                        /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                        this.readChar();
                        while((/* isDigit *//\d/.test(this.curChar[0]))) {{
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.readChar();
                        }};
                    }
                } catch(e1) {
                    if (!(e1.message === ("End Of Text"))){
                        throw new PrologPlusCG.prolog.CompileException("Error during the reading of a number " + /* toString */this.token.str + " at line " + this.curLineNumber);
                    }
                }
                this.nTokenType = PrologPlusCG.prolog.DataTypes.uNumber;
            } else {
                switch((this.curChar).charCodeAt(0)) {
                case 34 /* '\"' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>'\"'; return sb; })(this.token);
                            try {
                                this.readChar();
                            } catch(e1) {
                                if (!(e1.message === ("End Of Text"))){
                                    throw new PrologPlusCG.prolog.CompileException("Error during the reading of a string " + /* toString */this.token.str + " at line " + this.curLineNumber);
                                }
                            }
                            while(((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) != '\"'.charCodeAt(0))) {{
                                /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                                try {
                                    this.readChar();
                                } catch(e1a) {
                                    if (!(e1a.message === ("End Of Text"))){
                                        throw new PrologPlusCG.prolog.CompileException("Error during the reading of a string " + /* toString */this.token.str + " at line " + this.curLineNumber);
                                    }
                                }
                            }};
                            /* append */(sb => { sb.str += <any>'\"'; return sb; })(this.token);
                            this.readChar();
                        } catch(e1b) {
                            if (!(e1b.message === ("End Of Text"))){
                                throw new PrologPlusCG.prolog.CompileException("Error in reading a string " + /* toString */this.token.str + " at line " + this.curLineNumber);
                            }
                        }
                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uString;
                    };
                    break;
                case 58 /* ':' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.readChar();
                            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '-'.charCodeAt(0)){
                                /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uEntails;
                                this.readChar();
                            } else if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == ':'.charCodeAt(0)){
                                /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uDoubleColon;
                                this.readChar();
                            } else {
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uColon;
                            }
                        } catch(e1) {
                            throw new PrologPlusCG.prolog.CompileException(e1.message + "\n Error in reading the :- symbol at line " + this.curLineNumber);
                        }
                    };
                    break;
                case 45 /* '-' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.readChar();
                            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '>'.charCodeAt(0)){
                                /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uRightArrow;
                                this.readChar();
                            } else {
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uMinus;
                            }
                        } catch(e1) {
                            throw new PrologPlusCG.prolog.CompileException("Error in reading the , symbol at line " + this.curLineNumber);
                        }
                    };
                    break;
                case 60 /* '<' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.readChar();
                            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '-'.charCodeAt(0)){
                                /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                                this.nTokenType = PrologPlusCG.prolog.DataTypes.uLeftArrow;
                                this.readChar();
                            } else {
                                throw new PrologPlusCG.prolog.CompileException("Error in reading the < symbol at line " + this.curLineNumber);
                            }
                        } catch(e1) {
                            throw new PrologPlusCG.prolog.CompileException("Error in reading the < symbol at line " + this.curLineNumber);
                        }
                    };
                    break;
                case 44 /* ',' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.nTokenType = PrologPlusCG.prolog.DataTypes.uComma;
                            this.readChar();
                        } catch(e1) {
                            throw new PrologPlusCG.prolog.CompileException("Error in reading the , symbol at line " + this.curLineNumber);
                        }
                    };
                    break;
                case 59 /* ';' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.nTokenType = PrologPlusCG.prolog.DataTypes.uSemicolon;
                            this.readChar();
                        } catch(e1) {
                            throw new PrologPlusCG.prolog.CompileException("Error in reading the ; symbol at line " + this.curLineNumber);
                        }
                    };
                    break;
                case 33 /* '!' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.nTokenType = PrologPlusCG.prolog.DataTypes.uExclamationMark;
                            this.readChar();
                        } catch(e1) {
                            if (!(e1.message === ("End Of Text"))){
                                throw new PrologPlusCG.prolog.CompileException("Error in reading the ! symbol at line " + this.curLineNumber);
                            }
                        }
                    };
                    break;
                case 63 /* '?' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.nTokenType = PrologPlusCG.prolog.DataTypes.uQuestionMark;
                            this.readChar();
                        } catch(e1) {
                            if (!(e1.message === ("End Of Text"))){
                                throw new PrologPlusCG.prolog.CompileException("Error in reading the ? symbol at line " + this.curLineNumber);
                            }
                        }
                    };
                    break;
                case 61 /* '=' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.nTokenType = PrologPlusCG.prolog.DataTypes.uEqualsSign;
                            this.readChar();
                        } catch(e1) {
                            throw new PrologPlusCG.prolog.CompileException("Error in reading the = symbol at line " + this.curLineNumber);
                        }
                    };
                    break;
                case 91 /* '[' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.nTokenType = PrologPlusCG.prolog.DataTypes.uOpenBracket;
                            this.readChar();
                        } catch(e1) {
                            throw new PrologPlusCG.prolog.CompileException("Error in reading the [ symbol at line " + this.curLineNumber);
                        }
                    };
                    break;
                case 93 /* ']' */:
                    {
                        /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uCloseBracket;
                        try {
                            this.readChar();
                        } catch(e1) {
                            if (!(e1.message === ("End Of Text"))){
                                throw new PrologPlusCG.prolog.CompileException("Error after reading the character ] at line " + this.curLineNumber);
                            }
                        }
                    };
                    break;
                case 123 /* '{' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.nTokenType = PrologPlusCG.prolog.DataTypes.uOpenBrace;
                            this.readChar();
                        } catch(e1) {
                            throw new PrologPlusCG.prolog.CompileException("Error in reading the { symbol at line " + this.curLineNumber);
                        }
                    };
                    break;
                case 125 /* '}' */:
                    {
                        /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uCloseBrace;
                        try {
                            this.readChar();
                        } catch(e1) {
                            if (!(e1.message === ("End Of Text"))){
                                throw new PrologPlusCG.prolog.CompileException("Error after reading the character } at line " + this.curLineNumber);
                            }
                        }
                    };
                    break;
                case 38 /* '&' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.nTokenType = PrologPlusCG.prolog.DataTypes.uAmpersAnd;
                            this.readChar();
                        } catch(e1) {
                            throw new PrologPlusCG.prolog.CompileException("Error in reading the & symbol at line " + this.curLineNumber);
                        }
                    };
                    break;
                case 62 /* '>' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.nTokenType = PrologPlusCG.prolog.DataTypes.uGreaterThan;
                            this.readChar();
                        } catch(e1) {
                            throw new PrologPlusCG.prolog.CompileException("Error in reading the > symbol at line " + this.curLineNumber);
                        }
                    };
                    break;
                case 95 /* '_' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.readChar();
                            while((/* isLetterOrDigit *//[a-zA-Z\d]/.test(this.curChar[0]) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '_'.charCodeAt(0)))) {{
                                /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                                this.readChar();
                            }};
                        } catch(e1) {
                            if (!(e1.message === ("End Of Text"))){
                                throw new PrologPlusCG.prolog.CompileException("Error in reading a variable identifier " + /* toString */this.token.str + " at line " + this.curLineNumber);
                            }
                        }
                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uVariable;
                    };
                    break;
                case 42 /* '*' */:
                    {
                        try {
                            /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                            this.readChar();
                            while((/* isLetterOrDigit *//[a-zA-Z\d]/.test(this.curChar[0]) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '_'.charCodeAt(0)))) {{
                                /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                                this.readChar();
                            }};
                        } catch(e1) {
                            if (!(e1.message === ("End Of Text"))){
                                throw new PrologPlusCG.prolog.CompileException("Error in reading a special identifier " + /* toString */this.token.str + " at line " + this.curLineNumber);
                            }
                        }
                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uIdentSpecial;
                    };
                    break;
                case 40 /* '(' */:
                    {
                        /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uOpenParens;
                        try {
                            this.readChar();
                        } catch(e1) {
                            throw new PrologPlusCG.prolog.CompileException("Error in reading the character ( at line " + this.curLineNumber);
                        }
                    };
                    break;
                case 41 /* ')' */:
                    {
                        /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uCloseParens;
                        try {
                            this.readChar();
                        } catch(e1) {
                            if (!(e1.message === ("End Of Text"))){
                                throw new PrologPlusCG.prolog.CompileException("Error in reading the character ) at line " + this.curLineNumber);
                            }
                        }
                    };
                    break;
                case 124 /* '|' */:
                    {
                        /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uPipe;
                        try {
                            this.readChar();
                        } catch(e1) {
                            throw new PrologPlusCG.prolog.CompileException("Error in reading the character | at line " + this.curLineNumber);
                        }
                    };
                    break;
                case 47 /* '/' */:
                    {
                        /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uIdentifier;
                        try {
                            this.readChar();
                        } catch(e1) {
                            throw new PrologPlusCG.prolog.CompileException("Error in reading the character / at line " + this.curLineNumber);
                        }
                    };
                    break;
                case 46 /* '.' */:
                    {
                        /* append */(sb => { sb.str += <any>this.curChar; return sb; })(this.token);
                        this.nTokenType = PrologPlusCG.prolog.DataTypes.uPeriod;
                        try {
                            this.readChar();
                        } catch(e2) {
                            if (e2.message === ("End Of Text")){
                                const aUnitTyp: PrologPlusCG.prolog.UnitType = new PrologPlusCG.prolog.UnitType(this.token, this.nTokenType);
                                /* addElement */(this.vctUnitTyp.push(aUnitTyp)>0);
                                throw new PrologPlusCG.prolog.CompileException("End Of Text");
                            } else {
                                throw new PrologPlusCG.prolog.CompileException(e2.message);
                            }
                        }
                    };
                    break;
                case 10 /* '\n' */:
                    throw new PrologPlusCG.prolog.CompileException("End Of Text");
                default:
                    throw new PrologPlusCG.prolog.CompileException("Illegal Character at line " + this.curLineNumber);
                }
            }
            const aUnitTyp: PrologPlusCG.prolog.UnitType = new PrologPlusCG.prolog.UnitType(this.token, this.nTokenType);
            /* addElement */(this.vctUnitTyp.push(aUnitTyp)>0);
        }

        recognizeToken$java_lang_String(param_token: string) {
            let str: string = this.token.str;
            if (!(str === param_token)){
                throw new PrologPlusCG.prolog.CompileException("Error: The string " + param_token + " is expected at line " + this.curLineNumber);
            }
            str = null;
        }

        public recognizeToken$java_lang_String$byte(param_token: string, param_token_type: number) {
            if (param_token != null){
                let str: string = this.token.str;
                if (!(str === param_token)){
                    throw new PrologPlusCG.prolog.CompileException("Error: The string " + param_token + " is expected at line " + this.curLineNumber);
                }
                str = null;
            } else if (param_token_type !== this.nTokenType){
                throw new PrologPlusCG.prolog.CompileException("Error: A " + param_token_type + " is expected at line " + this.curLineNumber);
            }
        }

        public recognizeToken(param_token?: any, param_token_type?: any) {
            if (((typeof param_token === 'string') || param_token === null) && ((typeof param_token_type === 'number') || param_token_type === null)) {
                return <any>this.recognizeToken$java_lang_String$byte(param_token, param_token_type);
            } else if (((typeof param_token === 'string') || param_token === null) && param_token_type === undefined) {
                return <any>this.recognizeToken$java_lang_String(param_token);
            } else throw new Error('invalid overload');
        }

        /**
         * b) Syntactic analysis
         * @param {boolean} bGenerateCode
         */
        public doCompile(bGenerateCode: boolean) {
            if (bGenerateCode){
                this.currElem = 0;
            } else {
                this.CompileTxt = this.env.getProgramText();
                this.textEndIndex = this.CompileTxt.length;
                if (this.textEndIndex === 0){
                    throw new PrologPlusCG.prolog.CompileException("Error : Empty prolog program");
                }
                this.curLineNumber = 1;
                this.curCharIndex = 0;
                this.readChar();
                /* clear */(this.vctUnitTyp.length = 0);
            }
            if (bGenerateCode){
                this.env.program = <any>({});
            }
            try {
                while((true)) {this.tRule(bGenerateCode)};
            } catch(e2) {
                if (!(e2.message === ("End Of Text"))){
                    throw new PrologPlusCG.prolog.CompileException(e2.message + "\nError in the rule at line " + this.curLineNumber);
                }
            }
            if (bGenerateCode){
                let paqRgles: PrologPlusCG.prolog.RuleVector = null;
                const keys: Array<string> = /* keySet */Object.keys(this.env.program);
                for(let index = 0; index < keys.length; index++) {
                    let key = keys[index];
                    {
                        paqRgles = /* get */((m,k) => m[k]===undefined?null:m[k])(this.env.program, key);
                        paqRgles.trimToSize();
                    }
                }
            }
        }

        checkThatRuleOnlyHasAtoms() {
            const myRule: PrologPlusCG.prolog.PrologRule = this.env.pCurRule;
            if (!myRule.hasOnlyAtoms(this.env)){
                throw new PrologPlusCG.prolog.CompileException("Error: rule at line " + this.curLineNumber + " does not consist solely of atoms.\nPerhaps you used a variable name, like \'T\'?\n");
            }
        }

        tRule(bGenerateCode: boolean) {
            if (bGenerateCode && (this.currElem !== /* size */(<number>this.vctUnitTyp.length))){
                this.env.pCurRule = new PrologPlusCG.prolog.PrologRule();
            }
            try {
                this.tGoal(bGenerateCode);
            } catch(eBt) {
                if (!(eBt.message === ("End Of Text"))){
                    throw new PrologPlusCG.prolog.CompileException(eBt.message + "\n Error in the rule head, at line " + this.curLineNumber);
                } else {
                    throw new PrologPlusCG.prolog.CompileException("End Of Text");
                }
            }
            let TypeRegle: number = 0;
            try {
                if ((this.nTokenType === PrologPlusCG.prolog.DataTypes.uEntails) || (this.nTokenType === PrologPlusCG.prolog.DataTypes.uGreaterThan) || (this.nTokenType === PrologPlusCG.prolog.DataTypes.uEqualsSign) || (this.nTokenType === PrologPlusCG.prolog.DataTypes.uLeftArrow)){
                    switch((this.nTokenType)) {
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
                    while((this.nTokenType === PrologPlusCG.prolog.DataTypes.uComma)) {this.tGoal(bGenerateCode)};
                }
                this.recognizeToken$java_lang_String(".");
                if (bGenerateCode){
                    this.env.pCurRule.trimToSize();
                }
            } catch(e3) {
                throw new PrologPlusCG.prolog.CompileException(e3.message + "\n Error in the rule tail, at line " + this.curLineNumber);
            }
            let ClePaquet: string = null;
            if (bGenerateCode && (TypeRegle === 1 || TypeRegle === 2)){
                this.checkThatRuleOnlyHasAtoms();
            }
            if (bGenerateCode){
                if (TypeRegle === 0){
                    ClePaquet = this.nameOfArgument(this.env.pCurRule.getAt(0), -1);
                } else if (TypeRegle === 1){
                    ClePaquet = this.valSysSP;
                } else if (TypeRegle === 2){
                    ClePaquet = this.valSysINST;
                } else if (TypeRegle === 3){
                    ClePaquet = this.valSysGEN + this.nameOfArgument(this.env.pCurRule.getAt(0), -1);
                    let aCple: PrologPlusCG.prolog.PrologTerm = new PrologPlusCG.prolog.PrologTerm();
                    const aDataObjectId: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, this.valSysCleBtCp);
                    aCple.addData(aDataObjectId);
                    aCple.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, this.env.pCurRule.getAt(0)));
                    const aDataObjectVr: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uVariable, this.valSysIdVar);
                    aCple.addData(aDataObjectVr);
                    this.env.pCurRule.set(0, aCple);
                    aCple = new PrologPlusCG.prolog.PrologTerm();
                    aCple.addData(aDataObjectId);
                    aCple.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, this.env.pCurRule.getAt(1)));
                    aCple.addData(aDataObjectVr);
                    this.env.pCurRule.set(1, aCple);
                }
                if (/* containsKey */this.env.program.hasOwnProperty(ClePaquet)){
                    let regles: PrologPlusCG.prolog.RuleVector = <PrologPlusCG.prolog.RuleVector>/* get */((m,k) => m[k]===undefined?null:m[k])(this.env.program, ClePaquet);
                    regles.addRule(this.env.pCurRule);
                    regles = null;
                } else {
                    let Regles: PrologPlusCG.prolog.RuleVector = new PrologPlusCG.prolog.RuleVector();
                    Regles.addRule(this.env.pCurRule);
                    /* put */(this.env.program[ClePaquet] = Regles);
                    Regles = null;
                }
            } else if (this.curCharIndex === this.textEndIndex){
                throw new PrologPlusCG.prolog.CompileException("End Of Text");
            }
            ClePaquet = null;
        }

        tGoal(bGenerateCode: boolean) {
            const but1: PrologPlusCG.prolog.PrologTerm = this.tSimpleGoal(bGenerateCode);
            let but2: PrologPlusCG.prolog.PrologTerm = null;
            if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uDoubleColon){
                but2 = this.tSimpleGoal(bGenerateCode);
            }
            if (bGenerateCode){
                if (but2 == null){
                    this.env.pCurRule.addTerm(but1);
                } else {
                    let aTerm: PrologPlusCG.prolog.PrologTerm = new PrologPlusCG.prolog.PrologTerm();
                    let aDataObject: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, this.valSysCleBtCp);
                    aTerm.addData(aDataObject);
                    if ((but1.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (but1.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uCG)){
                        aTerm.addData(but1.getAt(0));
                    } else {
                        aTerm.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, but1));
                    }
                    if ((but2.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (but2.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uCG)){
                        aTerm.addData(but2.getAt(0));
                    } else {
                        aTerm.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, but2));
                    }
                    this.env.pCurRule.addTerm(aTerm);
                    aTerm = null;
                    aDataObject = null;
                }
            }
        }

        tSimpleGoal(bGenerateCode: boolean): PrologPlusCG.prolog.PrologTerm {
            let aTerm: PrologPlusCG.prolog.PrologTerm = null;
            try {
                const pDon: PrologPlusCG.prolog.PrologData = this.tIdent(bGenerateCode);
                aTerm = this.tTerm(pDon, bGenerateCode);
            } catch(e) {
                if (e.message === ("End Of Text")){
                    throw new PrologPlusCG.prolog.CompileException("End Of Text");
                } else if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(e.message, "Error: instead of ") && ((this.nTokenType === PrologPlusCG.prolog.DataTypes.uOpenBracket) || (this.nTokenType === PrologPlusCG.prolog.DataTypes.uOpenBrace) || (this.nTokenType === PrologPlusCG.prolog.DataTypes.uVariable))){
                    let aCG: PrologPlusCG.cg.CG = null;
                    if (bGenerateCode){
                        aCG = new PrologPlusCG.cg.CG();
                    }
                    try {
                        if ((this.nTokenType === PrologPlusCG.prolog.DataTypes.uOpenBracket) || (this.nTokenType === PrologPlusCG.prolog.DataTypes.uVariable)){
                            this.tGC(bGenerateCode, aCG);
                        } else {
                            this.tGCPlus(bGenerateCode, aCG);
                        }
                    } catch(ceGC) {
                        if (ceGC.message === ("End Of Text")){
                            throw new PrologPlusCG.prolog.CompileException("End Of Text");
                        } else {
                            throw new PrologPlusCG.prolog.CompileException("Error in the CG at line " + this.curLineNumber);
                        }
                    }
                    if (bGenerateCode){
                        aCG.removeSpecialIdent();
                        const pDataCG: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uCG, aCG);
                        aTerm = new PrologPlusCG.prolog.PrologTerm();
                        aTerm.addData(pDataCG);
                        aCG = null;
                    }
                } else {
                    throw new PrologPlusCG.prolog.CompileException(e.message + "\n Error : A correct goal is expected at line " + this.curLineNumber);
                }
            }
            return aTerm;
        }

        tReferent(bGenerateCode: boolean): PrologPlusCG.prolog.PrologData {
            let Ref: PrologPlusCG.prolog.PrologData = null;
            let pTermTmp: PrologPlusCG.prolog.PrologTerm = null;
            if (bGenerateCode){
                pTermTmp = new PrologPlusCG.prolog.PrologTerm();
            }
            const indTmp: number = /* size */(<number>this.vctUnitTyp.length);
            this.tPrologData(bGenerateCode, pTermTmp);
            if (bGenerateCode){
                Ref = pTermTmp.getAt(0);
                pTermTmp.clear();
                pTermTmp = null;
                if (Ref.typeOfData === PrologPlusCG.prolog.DataTypes.uString){
                    Ref.typeOfData = PrologPlusCG.prolog.DataTypes.uIdentifier;
                }
            } else {
                const typeUnite: number = (<PrologPlusCG.prolog.UnitType>/* elementAt */this.vctUnitTyp[indTmp]).typUnit;
                if ((typeUnite !== PrologPlusCG.prolog.DataTypes.uString) && (typeUnite !== PrologPlusCG.prolog.DataTypes.uIdentifier) && (typeUnite !== PrologPlusCG.prolog.DataTypes.uVariable) && (typeUnite !== PrologPlusCG.prolog.DataTypes.uIdentSpecial) && (typeUnite !== PrologPlusCG.prolog.DataTypes.uOpenBrace)){
                    throw new PrologPlusCG.prolog.CompileException("Error: a referent is expected at line " + this.curLineNumber);
                }
            }
            return Ref;
        }

        tIdent(bGenerateCode: boolean): PrologPlusCG.prolog.PrologData {
            this.readToken(bGenerateCode);
            if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uString){
                this.nTokenType = PrologPlusCG.prolog.DataTypes.uIdentifier;
            }
            if ((this.nTokenType !== PrologPlusCG.prolog.DataTypes.uIdentifier) && ((this.nTokenType !== PrologPlusCG.prolog.DataTypes.uVariable) || this.test1CarCour(bGenerateCode))){
                throw new PrologPlusCG.prolog.CompileException("Error: instead of " + /* toString */this.token.str + ", a (term) identifier is expected at line " + this.curLineNumber);
            }
            let pDon: PrologPlusCG.prolog.PrologData = null;
            if (bGenerateCode){
                pDon = new PrologPlusCG.prolog.PrologData();
                pDon.typeOfData = this.nTokenType;
                pDon.data = this.token.str;
            }
            return pDon;
        }

        tTerm(pIdent: PrologPlusCG.prolog.PrologData, bGenerateCode: boolean): PrologPlusCG.prolog.PrologTerm {
            let pTerme: PrologPlusCG.prolog.PrologTerm = null;
            if (bGenerateCode){
                pTerme = new PrologPlusCG.prolog.PrologTerm();
                pTerme.addData(pIdent);
            }
            try {
                this.readToken(bGenerateCode);
                if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uOpenParens){
                    this.tPrologData(bGenerateCode, pTerme);
                    while((this.nTokenType === PrologPlusCG.prolog.DataTypes.uComma)) {this.tPrologData(bGenerateCode, pTerme)};
                    this.recognizeToken$java_lang_String(")");
                    try {
                        this.readToken(bGenerateCode);
                    } catch(e1) {
                        if (!(e1.message === ("End Of Text"))){
                            throw new PrologPlusCG.prolog.CompileException(e1.message);
                        }
                    }
                }
            } catch(e) {
                if (!(e.message === ("End Of Text"))){
                    throw new PrologPlusCG.prolog.CompileException(e.message + "\n Error in the argument list of a term at line " + this.curLineNumber);
                }
            }
            if (bGenerateCode){
                pTerme.trimToSize();
            }
            return pTerme;
        }

        tConcept(bGenerateCode: boolean, unGC: PrologPlusCG.cg.CG): PrologPlusCG.cg.Concept {
            let Type: PrologPlusCG.prolog.PrologData = null;
            let Ref: PrologPlusCG.prolog.PrologData = null;
            let Val: PrologPlusCG.prolog.PrologData = null;
            if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uVariable){
                if (bGenerateCode){
                    Ref = new PrologPlusCG.prolog.PrologData();
                    Ref.typeOfData = this.nTokenType;
                    Ref.data = this.token.str;
                }
            } else {
                try {
                    Type = this.tIdent(bGenerateCode);
                    this.readToken(bGenerateCode);
                    if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uColon){
                        Ref = this.tReferent(bGenerateCode);
                    }
                    if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uEqualsSign){
                        let pTermTmp: PrologPlusCG.prolog.PrologTerm = null;
                        if (bGenerateCode){
                            pTermTmp = new PrologPlusCG.prolog.PrologTerm();
                        }
                        this.tPrologData(bGenerateCode, pTermTmp);
                        if (bGenerateCode){
                            Val = pTermTmp.getAt(0);
                            pTermTmp.clear();
                            pTermTmp = null;
                        }
                    }
                    this.recognizeToken$java_lang_String$byte(null, PrologPlusCG.prolog.DataTypes.uCloseBracket);
                } catch(ce) {
                    throw new PrologPlusCG.prolog.CompileException("Error in the concept at line " + this.curLineNumber);
                }
            }
            let conc: PrologPlusCG.cg.Concept = null;
            if (bGenerateCode){
                let trouve: boolean = false;
                for(let listIndex2: number = 0; listIndex2 < /* size */(<number>unGC.m_vctConcepts.length) && !trouve; ++listIndex2) {{
                    conc = /* get */unGC.m_vctConcepts[listIndex2];
                    if ((conc.m_pdReferent != null) && (Ref != null) && (typeof conc.m_pdReferent.data === 'string') && (typeof Ref.data === 'string') && (Ref.valString() === conc.m_pdReferent.valString())){
                        trouve = true;
                    } else if ((conc.m_pdReferent != null) && (Ref != null) && (conc.m_pdReferent.typeOfData === Ref.typeOfData) && (conc.m_pdReferent.typeOfData === PrologPlusCG.prolog.DataTypes.uSet) && this.setsAreEqual(<PrologPlusCG.prolog.PrologList>conc.m_pdReferent.data, <PrologPlusCG.prolog.PrologList>Ref.data)){
                        trouve = true;
                    }
                };}
                if (!trouve){
                    conc = new PrologPlusCG.cg.Concept(Type, Ref, Val, this.env);
                    unGC.addConcept(conc);
                }
            }
            return conc;
        }

        tGCPlus(bGenerateCode: boolean, unGC: PrologPlusCG.cg.CG) {
            let encore: boolean = true;
            while((encore)) {{
                this.readToken(bGenerateCode);
                if ((this.nTokenType !== PrologPlusCG.prolog.DataTypes.uOpenBracket) && (this.nTokenType !== PrologPlusCG.prolog.DataTypes.uVariable)){
                    throw new PrologPlusCG.prolog.CompileException("Error: A CG is expected at line " + this.curLineNumber);
                }
                this.tGC(bGenerateCode, unGC);
                if (this.nTokenType !== PrologPlusCG.prolog.DataTypes.uAmpersAnd){
                    encore = false;
                }
            }};
            this.recognizeToken$java_lang_String$byte(null, PrologPlusCG.prolog.DataTypes.uCloseBrace);
            this.readToken(bGenerateCode);
        }

        tGC(bGenerateCode: boolean, unGC: PrologPlusCG.cg.CG): PrologPlusCG.cg.Concept {
            const conc: PrologPlusCG.cg.Concept = this.tConcept(bGenerateCode, unGC);
            try {
                this.readToken(bGenerateCode);
            } catch(ceGC) {
                if (!(ceGC.message === ("End Of Text"))){
                    throw new PrologPlusCG.prolog.CompileException("Error in the CG at line " + this.curLineNumber);
                }
            }
            if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uLeftArrow){
                this.tRelEntr(bGenerateCode, unGC, conc);
            } else if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uMinus){
                this.tRelSortOuRels(bGenerateCode, unGC, conc);
            }
            return conc;
        }

        tRelSort(bGenerateCode: boolean, unGC: PrologPlusCG.cg.CG, concSrce: PrologPlusCG.cg.Concept) {
            const idRel: string = /* toString */this.token.str;
            const typIdRel: number = this.nTokenType;
            this.readToken(bGenerateCode);
            this.recognizeToken$java_lang_String$byte(null, PrologPlusCG.prolog.DataTypes.uRightArrow);
            this.readToken(bGenerateCode);
            if ((this.nTokenType !== PrologPlusCG.prolog.DataTypes.uOpenBracket) && (this.nTokenType !== PrologPlusCG.prolog.DataTypes.uVariable)){
                throw new PrologPlusCG.prolog.CompileException("Error: A CG is expected at line " + this.curLineNumber);
            }
            const concCble: PrologPlusCG.cg.Concept = this.tGC(bGenerateCode, unGC);
            if (bGenerateCode){
                const nouvRel: PrologPlusCG.cg.Relation = new PrologPlusCG.cg.Relation(new PrologPlusCG.prolog.PrologData(typIdRel, idRel), concSrce, concCble);
                unGC.addRelation(nouvRel);
            }
        }

        tRelEntr(bGenerateCode: boolean, unGC: PrologPlusCG.cg.CG, concCble: PrologPlusCG.cg.Concept) {
            this.readToken(bGenerateCode);
            const idRel: string = /* toString */this.token.str;
            const typIdRel: number = this.nTokenType;
            this.readToken(bGenerateCode);
            this.recognizeToken$java_lang_String$byte(null, PrologPlusCG.prolog.DataTypes.uMinus);
            this.readToken(bGenerateCode);
            if ((this.nTokenType !== PrologPlusCG.prolog.DataTypes.uOpenBracket) && (this.nTokenType !== PrologPlusCG.prolog.DataTypes.uVariable)){
                throw new PrologPlusCG.prolog.CompileException("Error: A CG is expected at line " + this.curLineNumber);
            }
            const concSrce: PrologPlusCG.cg.Concept = this.tGC(bGenerateCode, unGC);
            if (bGenerateCode){
                const nouvRel: PrologPlusCG.cg.Relation = new PrologPlusCG.cg.Relation(new PrologPlusCG.prolog.PrologData(typIdRel, idRel), concSrce, concCble);
                unGC.addRelation(nouvRel);
            }
        }

        tRelSortOuRels(bGenerateCode: boolean, unGC: PrologPlusCG.cg.CG, conc: PrologPlusCG.cg.Concept) {
            this.readToken(bGenerateCode);
            if ((this.nTokenType === PrologPlusCG.prolog.DataTypes.uIdentifier) || (this.nTokenType === PrologPlusCG.prolog.DataTypes.uVariable)){
                this.tRelSort(bGenerateCode, unGC, conc);
            } else {
                this.tRels(bGenerateCode, unGC, conc);
            }
        }

        tRels(bGenerateCode: boolean, unGC: PrologPlusCG.cg.CG, conc: PrologPlusCG.cg.Concept) {
            if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uMinus){
                this.readToken(bGenerateCode);
                if ((this.nTokenType !== PrologPlusCG.prolog.DataTypes.uIdentifier) && (this.nTokenType !== PrologPlusCG.prolog.DataTypes.uVariable)){
                    throw new PrologPlusCG.prolog.CompileException("Error: an identifier of a constant or of a variable is expected.");
                }
                this.tRelSort(bGenerateCode, unGC, conc);
            } else {
                this.recognizeToken$java_lang_String$byte(null, PrologPlusCG.prolog.DataTypes.uLeftArrow);
                this.tRelEntr(bGenerateCode, unGC, conc);
            }
            if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uComma){
                if (this.test1CarCour(bGenerateCode)){
                    this.readToken(bGenerateCode);
                    this.tRels(bGenerateCode, unGC, conc);
                }
            }
            if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uSemicolon){
                this.readToken(bGenerateCode);
            }
        }

        public tSentence() {
            try {
                while((true)) {this.readToken(false)};
            } catch(e) {
                if (!(e.message === ("End Of Text"))){
                    throw new PrologPlusCG.prolog.CompileException("Error while reading a sentence at line " + this.curLineNumber);
                }
            }
        }

        public tPrologData(bGenerateCode: boolean, pLstPrlg2: PrologPlusCG.prolog.PrologDataVector) {
            let pData: PrologPlusCG.prolog.PrologData = null;
            if (bGenerateCode){
                pData = new PrologPlusCG.prolog.PrologData();
            }
            let uniteDejaLue: boolean = false;
            this.readToken(bGenerateCode);
            if (bGenerateCode){
                pData.typeOfData = this.nTokenType;
            }
            switch((this.nTokenType)) {
            case 0 /* uNumber */:
                if (bGenerateCode){
                    const stUnite: string = /* toString */this.token.str;
                    if (stUnite.indexOf(".") >= 0){
                        pData.data = new Number(stUnite).valueOf();
                    } else {
                        try {
                            pData.data = new Number(stUnite).valueOf();
                        } catch(e) {
                            throw new PrologPlusCG.prolog.CompileException(e.message + "\n Error in reading the number.\nProbably it was too large or too small (negative).");
                        }
                    }
                }
                break;
            case 1 /* uBoolean */:
                if (bGenerateCode){
                    const s: string = /* toString */this.token.str;
                    const b: boolean = s === ("true");
                    if (b){
                        pData.data = true;
                    } else {
                        pData.data = false;
                    }
                }
                break;
            case 2 /* uIdentifier */:
                {
                    if (bGenerateCode){
                        pData.data = this.token.str;
                    }
                    let pTerme: PrologPlusCG.prolog.PrologTerm = this.tTerm(pData, bGenerateCode);
                    if (bGenerateCode){
                        if (pTerme.size() > 1){
                            pTerme.trimToSize();
                            pData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, pTerme);
                        } else {
                            pTerme.clear();
                        }
                    }
                    pTerme = null;
                    uniteDejaLue = true;
                };
                break;
            case 28 /* uIdentSpecial */:
            case 3 /* uString */:
                if (bGenerateCode){
                    pData.data = this.token.str;
                }
                break;
            case 4 /* uVariable */:
                {
                    if (this.test1CarCour(bGenerateCode)){
                        let unGC: PrologPlusCG.cg.CG = null;
                        if (bGenerateCode){
                            unGC = new PrologPlusCG.cg.CG();
                        }
                        this.tGC(bGenerateCode, unGC);
                        if (bGenerateCode){
                            unGC.removeSpecialIdent();
                            pData.typeOfData = PrologPlusCG.prolog.DataTypes.uCG;
                            pData.data = unGC;
                        }
                        uniteDejaLue = true;
                        unGC = null;
                    } else if (bGenerateCode){
                        pData.data = this.token.str;
                    }
                };
                break;
            case 7 /* uOpenParens */:
                {
                    let pLstPrlg: PrologPlusCG.prolog.PrologList = null;
                    if (bGenerateCode){
                        pLstPrlg = new PrologPlusCG.prolog.PrologList();
                    }
                    let bListIsEmpty: boolean = false;
                    try {
                        this.tPrologData(bGenerateCode, pLstPrlg);
                    } catch(e1) {
                        if ((e1.message === ("Error: Unrecognized data")) && (this.nTokenType === PrologPlusCG.prolog.DataTypes.uCloseParens)){
                            bListIsEmpty = true;
                        } else {
                            throw new PrologPlusCG.prolog.CompileException(e1.message + "\n Error in reading data");
                        }
                    }
                    if (!bListIsEmpty){
                        while((this.nTokenType === PrologPlusCG.prolog.DataTypes.uComma)) {this.tPrologData(bGenerateCode, pLstPrlg)};
                        if (this.nTokenType === PrologPlusCG.prolog.DataTypes.uPipe){
                            this.tPrologData(bGenerateCode, pLstPrlg);
                            if (!bGenerateCode && ((<PrologPlusCG.prolog.UnitType>/* elementAt */this.vctUnitTyp[/* size */(<number>this.vctUnitTyp.length) - 2]).typUnit !== PrologPlusCG.prolog.DataTypes.uVariable)){
                                throw new PrologPlusCG.prolog.CompileException("A variable is expected after | at line " + this.curLineNumber);
                            }
                            if (bGenerateCode){
                                (<PrologPlusCG.prolog.PrologData>pLstPrlg.lastElement()).typeOfData = PrologPlusCG.prolog.DataTypes.uVarList;
                            }
                        }
                        this.recognizeToken$java_lang_String(")");
                    }
                    if (bGenerateCode){
                        pData.typeOfData = PrologPlusCG.prolog.DataTypes.uList;
                        pLstPrlg.trimToSize();
                        pData.data = pLstPrlg;
                    }
                    pLstPrlg = null;
                };
                break;
            case 25 /* uOpenBrace */:
                {
                    let pLstPrlg: PrologPlusCG.prolog.PrologList = null;
                    if (bGenerateCode){
                        pLstPrlg = new PrologPlusCG.prolog.PrologList();
                    }
                    let bSetIsEmpty: boolean = false;
                    let indTmp: number = /* size */(<number>this.vctUnitTyp.length);
                    try {
                        this.tPrologData(bGenerateCode, pLstPrlg);
                        if (!bGenerateCode){
                            const typeUnite: number = (<PrologPlusCG.prolog.UnitType>/* elementAt */this.vctUnitTyp[indTmp]).typUnit;
                            if ((typeUnite !== PrologPlusCG.prolog.DataTypes.uString) && (typeUnite !== PrologPlusCG.prolog.DataTypes.uIdentifier)){
                                throw new PrologPlusCG.prolog.CompileException("Error: a set of referents is expected at line " + this.curLineNumber);
                            }
                        }
                    } catch(e1) {
                        if ((e1.message === ("Error: Unrecognized data")) && (this.nTokenType === PrologPlusCG.prolog.DataTypes.uCloseBrace)){
                            bSetIsEmpty = true;
                        } else {
                            throw new PrologPlusCG.prolog.CompileException(e1.message + "\n Error in reading data");
                        }
                    }
                    if (!bSetIsEmpty){
                        while((this.nTokenType === PrologPlusCG.prolog.DataTypes.uComma)) {{
                            indTmp = /* size */(<number>this.vctUnitTyp.length);
                            this.tPrologData(bGenerateCode, pLstPrlg);
                            if (!bGenerateCode){
                                const typeUnite: number = (<PrologPlusCG.prolog.UnitType>/* elementAt */this.vctUnitTyp[indTmp]).typUnit;
                                if ((typeUnite !== PrologPlusCG.prolog.DataTypes.uString) && (typeUnite !== PrologPlusCG.prolog.DataTypes.uIdentifier)){
                                    throw new PrologPlusCG.prolog.CompileException("Error: a set of referents is expected at line " + this.curLineNumber);
                                }
                            }
                        }};
                        this.recognizeToken$java_lang_String("}");
                    }
                    if (bGenerateCode){
                        pData.typeOfData = PrologPlusCG.prolog.DataTypes.uSet;
                        pLstPrlg.trimToSize();
                        pData.data = pLstPrlg;
                    }
                    pLstPrlg = null;
                };
                break;
            case 15 /* uOpenBracket */:
                {
                    let unGC: PrologPlusCG.cg.CG = null;
                    if (bGenerateCode){
                        unGC = new PrologPlusCG.cg.CG();
                    }
                    this.tGC(bGenerateCode, unGC);
                    if (bGenerateCode){
                        unGC.removeSpecialIdent();
                        pData.typeOfData = PrologPlusCG.prolog.DataTypes.uCG;
                        pData.data = unGC;
                    }
                    uniteDejaLue = true;
                    unGC = null;
                };
                break;
            default:
                throw new PrologPlusCG.prolog.CompileException("Error: Unrecognized data");
            }
            if (bGenerateCode){
                pLstPrlg2.addElement(pData);
            }
            if (!uniteDejaLue){
                this.readToken(bGenerateCode);
            }
        }

        /*private*/ test1CarCour(bGenerateCode: boolean): boolean {
            let b: boolean = false;
            if (bGenerateCode){
                const typeUnit: number = (<PrologPlusCG.prolog.UnitType>/* elementAt */this.vctUnitTyp[this.currElem]).typUnit;
                if ((typeUnit === PrologPlusCG.prolog.DataTypes.uMinus) || (typeUnit === PrologPlusCG.prolog.DataTypes.uLeftArrow)){
                    b = true;
                }
            } else {
                while((Compile.isSpaceChar(this.curChar) || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '\t'.charCodeAt(0)))) {this.readChar()};
                if ((((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '-'.charCodeAt(0)) && !/* isDigit *//\d/.test(this.nextChar()[0])) || (((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.curChar) == '<'.charCodeAt(0)) && ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.nextChar()) == '-'.charCodeAt(0)))){
                    b = true;
                }
            }
            return b;
        }

        public hasString(Ref: string, myset: PrologPlusCG.prolog.PrologList): boolean {
            let tmpData: PrologPlusCG.prolog.PrologData = null;
            let st: string = null;
            let bFound: boolean = false;
            for(let listIndex: number = 0; listIndex < myset.size() && !bFound; ++listIndex) {{
                tmpData = myset.get(listIndex);
                st = <string>tmpData.data;
                if (st === Ref){
                    bFound = true;
                }
            };}
            return bFound;
        }

        public intersection(set1: PrologPlusCG.prolog.PrologList, set2: PrologPlusCG.prolog.PrologList): PrologPlusCG.prolog.PrologList {
            const resultSet: PrologPlusCG.prolog.PrologList = new PrologPlusCG.prolog.PrologList();
            let tmpData: PrologPlusCG.prolog.PrologData = null;
            for(let listIndex: number = 0; listIndex < set1.size(); ++listIndex) {{
                tmpData = set1.get(listIndex);
                if (this.hasString(<string>tmpData.data, set2)){
                    resultSet.addData(tmpData);
                }
            };}
            return resultSet;
        }

        public union(s1: any, set2: PrologPlusCG.prolog.PrologList): PrologPlusCG.prolog.PrologList {
            const resultSet: PrologPlusCG.prolog.PrologList = set2.myCopy();
            if (s1 != null && s1 instanceof <any>PrologPlusCG.prolog.PrologData){
                const DonTmp: PrologPlusCG.prolog.PrologData = <PrologPlusCG.prolog.PrologData>s1;
                if (!this.hasString(<string>DonTmp.data, set2)){
                    resultSet.addData(DonTmp);
                }
            } else {
                const set1: PrologPlusCG.prolog.PrologList = <PrologPlusCG.prolog.PrologList>s1;
                let tempData: PrologPlusCG.prolog.PrologData = null;
                for(let listIndex: number = 0; listIndex < set1.size(); ++listIndex) {{
                    tempData = set1.get(listIndex);
                    if (!this.hasString(<string>tempData.data, set2)){
                        resultSet.addData(tempData);
                    }
                };}
            }
            return resultSet;
        }

        public set1IsSubsetOfSet2(ens1: PrologPlusCG.prolog.PrologList, ens2: PrologPlusCG.prolog.PrologList): boolean {
            return this.compareSets(ens1, ens2, false);
        }

        compareSets(set1: PrologPlusCG.prolog.PrologList, set2: PrologPlusCG.prolog.PrologList, testEquality: boolean): boolean {
            let bSetsAreEqual: boolean = true;
            const vctCopyOfElementsInSet2: Array<any> = <any>([]);
            let tmpData: PrologPlusCG.prolog.PrologData = null;
            for(let listIndex: number = 0; listIndex < set2.size(); ++listIndex) {{
                tmpData = set2.get(listIndex);
                /* addElement */(vctCopyOfElementsInSet2.push(tmpData.data)>0);
            };}
            let st1: string;
            let st2: string = null;
            let i: number = 0;
            let bFound: boolean = false;
            for(let listIndex: number = 0; listIndex < set1.size() && bSetsAreEqual; ++listIndex) {{
                tmpData = set1.get(listIndex);
                st1 = <string>tmpData.data;
                i = 0;
                bFound = false;
                for(let listIndex3: number = 0; listIndex3 < /* size */(<number>vctCopyOfElementsInSet2.length) && !bFound; ++listIndex3) {{
                    st2 = <string>/* get */vctCopyOfElementsInSet2[listIndex3];
                    if (st1 === st2){
                        bFound = true;
                    } else {
                        i++;
                    }
                };}
                if (bFound){
                    /* removeElementAt */vctCopyOfElementsInSet2.splice(i, 1);
                } else {
                    bSetsAreEqual = false;
                }
            };}
            if (testEquality){
                bSetsAreEqual = bSetsAreEqual && /* isEmpty */(vctCopyOfElementsInSet2.length == 0);
                if (set1.isEmpty() || set2.isEmpty()){
                    bSetsAreEqual = (set1.isEmpty() && set2.isEmpty());
                }
            } else if (set1.isEmpty() || set2.isEmpty()){
                bSetsAreEqual = set1.isEmpty();
            }
            /* clear */(vctCopyOfElementsInSet2.length = 0);
            return bSetsAreEqual;
        }

        setsAreEqual(ens1: PrologPlusCG.prolog.PrologList, ens2: PrologPlusCG.prolog.PrologList): boolean {
            return this.compareSets(ens1, ens2, true);
        }

        compileTerm(strTerm: string): PrologPlusCG.prolog.PrologTerm {
            this.CompileTxt = strTerm;
            this.textEndIndex = this.CompileTxt.length;
            this.curCharIndex = 0;
            const saveCurLineNumber: number = this.curLineNumber;
            this.readChar();
            /* clear */(this.vctUnitTyp.length = 0);
            this.tGoal(false);
            this.curLineNumber = saveCurLineNumber;
            this.currElem = 0;
            this.env.pCurRule = new PrologPlusCG.prolog.PrologRule();
            this.tGoal(true);
            /* clear */(this.vctUnitTyp.length = 0);
            const trm: PrologPlusCG.prolog.PrologTerm = this.env.pCurRule.getAt(0);
            this.env.pCurRule.clear();
            this.env.pCurRule = null;
            return trm;
        }

        compileAlternatePrintString(strData: string): Array<string> {
            const unTermTmp: PrologPlusCG.prolog.PrologTerm = this.compileTerm(strData);
            return this.distillVectorToAlternatePrintStringVector(unTermTmp);
        }

        distillVectorToAlternatePrintStringVector(v: PrologPlusCG.prolog.PrologDataVector): Array<string> {
            const vctDistilled: Array<string> = <any>([]);
            let aDataObject: PrologPlusCG.prolog.PrologData = null;
            for(let listIndex: number = 0; listIndex < v.size(); ++listIndex) {{
                aDataObject = v.get(listIndex);
                if ((aDataObject.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm) || (aDataObject.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm)){
                    const data: PrologPlusCG.prolog.PrologDataVector = <PrologPlusCG.prolog.PrologDataVector>aDataObject.data;
                    /* addElement */(vctDistilled.push(/* toString */('['+this.distillVectorToAlternatePrintStringVector(data).join(', ')+']'))>0);
                } else {
                    /* addElement */(vctDistilled.push(aDataObject.data.toString())>0);
                }
            };}
            return vctDistilled;
        }

        public compileQuery(request: string) {
            this.CompileTxt = request;
            this.textEndIndex = this.CompileTxt.length;
            this.curCharIndex = 0;
            const sauvNumLigneCour: number = this.curLineNumber;
            this.readChar();
            /* clear */(this.vctUnitTyp.length = 0);
            try {
                this.tGoal(false);
            } catch(exc1) {
                if ((exc1.message === ("End Of Text")) && /* isEmpty */(this.vctUnitTyp.length == 0)){
                    throw new PrologPlusCG.prolog.CompileException("null request");
                } else if (exc1.message === ("End Of Text")){
                    this.recognizeToken$java_lang_String(".");
                } else {
                    throw new PrologPlusCG.prolog.CompileException(exc1.message + "\n Error in the request.");
                }
            }
            try {
                while((this.nTokenType === PrologPlusCG.prolog.DataTypes.uComma)) {this.tGoal(false)};
                this.recognizeToken$java_lang_String(".");
            } catch(e) {
                if ((e.message === ("End Of Text")) && /* isEmpty */(this.vctUnitTyp.length == 0)){
                    throw new PrologPlusCG.prolog.CompileException("null request");
                } else if (e.message === ("End Of Text")){
                    this.recognizeToken$java_lang_String(".");
                } else {
                    throw new PrologPlusCG.prolog.CompileException(e.message + "\n Error in the request.");
                }
            }
            this.curLineNumber = sauvNumLigneCour;
            this.currElem = 0;
            this.env.pCurRule = new PrologPlusCG.prolog.PrologRule();
            this.tGoal(true);
            while((this.nTokenType === PrologPlusCG.prolog.DataTypes.uComma)) {this.tGoal(true)};
            this.recognizeToken$java_lang_String(".");
            this.env.pCurRule.trimToSize();
            this.determineQueryVariables();
            /* clear */(this.vctUnitTyp.length = 0);
        }

        determineQueryVariables() {
            /* clear */(this.vctVariableIdentifiersInQuery.length = 0);
            let unitTyp: PrologPlusCG.prolog.UnitType;
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>this.vctUnitTyp.length); ++listIndex1) {{
                unitTyp = /* get */this.vctUnitTyp[listIndex1];
                if ((unitTyp.typUnit === PrologPlusCG.prolog.DataTypes.uVariable) || (unitTyp.typUnit === PrologPlusCG.prolog.DataTypes.uVarList)){
                    let bFound: boolean = false;
                    let idVar: string;
                    for(let listIndex2: number = 0; listIndex2 < /* size */(<number>this.vctVariableIdentifiersInQuery.length) && !bFound; ++listIndex2) {{
                        idVar = /* get */this.vctVariableIdentifiersInQuery[listIndex2];
                        if (idVar === /* toString */unitTyp.unit.str){
                            bFound = true;
                        }
                    };}
                    if (!bFound){
                        /* addElement */(this.vctVariableIdentifiersInQuery.push(/* toString */unitTyp.unit.str)>0);
                    }
                }
            };}
        }

        nameOfArgument(UnTerme: PrologPlusCG.prolog.PrologTerm, niv: number): string {
            let strResult: string = null;
            const aDataObject: PrologPlusCG.prolog.PrologData = UnTerme.getAt(0);
            if (aDataObject.typeOfData === PrologPlusCG.prolog.DataTypes.uVariable){
            } else if (aDataObject.typeOfData === PrologPlusCG.prolog.DataTypes.uCG){
                strResult = this.valSysCleCG;
            } else if (aDataObject.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier){
                const idTerme: string = <string>UnTerme.getAt(0).data;
                if (idTerme === this.valSysCleBtCp){
                    const Arg1: PrologPlusCG.prolog.PrologData = UnTerme.getAt(1);
                    if (Arg1.typeOfData === PrologPlusCG.prolog.DataTypes.uCG){
                        strResult = this.valSysCleBtCp;
                    } else if (Arg1.typeOfData === PrologPlusCG.prolog.DataTypes.uVariable){
                        if (niv >= 0){
                            const contr: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(Arg1, niv);
                            if (contr.pData != null){
                                if (contr.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG){
                                    strResult = this.valSysCleBtCp;
                                } else if (contr.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm){
                                    const Cple1Term: PrologPlusCG.prolog.PrologTerm = <PrologPlusCG.prolog.PrologTerm>contr.pData.data;
                                    const st: string = this.getTermSlashNumberOfArgumentsString(<string>Cple1Term.getAt(0).data, Cple1Term.size() - 1);
                                    strResult = this.valSysCleBtCp + st;
                                }
                            } else {
                                throw new PrologPlusCG.prolog.CompileException("Error : The goal head is a free variable at " + this.curLineNumber);
                            }
                        }
                    } else if (Arg1.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm){
                        const Cple1Term: PrologPlusCG.prolog.PrologTerm = <PrologPlusCG.prolog.PrologTerm>Arg1.data;
                        const st: string = this.getTermSlashNumberOfArgumentsString(<string>Cple1Term.getAt(0).data, Cple1Term.size() - 1);
                        strResult = this.valSysCleBtCp + st;
                    }
                } else {
                    strResult = this.getTermSlashNumberOfArgumentsString(idTerme, UnTerme.size() - 1);
                }
            }
            return strResult;
        }

        getTermSlashNumberOfArgumentsString(Ident: string, number: number): string {
            let strNumber: string;
            strNumber = /* toString */(''+(number));
            return (Ident + "/" + strNumber);
        }
    }
    Compile["__class"] = "PrologPlusCG.prolog.Compile";
    Compile["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];


}
namespace PrologPlusCG.prolog {
    export class CompileException extends Error {
        static serialVersionUID: number = 3257568425244309042;

        public constructor(s: string) {
            super(s); this.message=s;
            (<any>Object).setPrototypeOf(this, CompileException.prototype);
        }
    }
    CompileException["__class"] = "PrologPlusCG.prolog.CompileException";

}
namespace PrologPlusCG.prolog {
    export class ConceptUnification {
        m_ConcMatched1: PrologPlusCG.cg.Concept;

        m_ConcMatched2: PrologPlusCG.cg.Concept;

        m_MatchedLocally: boolean;

        constructor(C1: PrologPlusCG.cg.Concept, C2: PrologPlusCG.cg.Concept, B: boolean) {
            if (this.m_ConcMatched1 === undefined) { this.m_ConcMatched1 = null; }
            if (this.m_ConcMatched2 === undefined) { this.m_ConcMatched2 = null; }
            if (this.m_MatchedLocally === undefined) { this.m_MatchedLocally = false; }
            this.m_ConcMatched1 = C1;
            this.m_ConcMatched2 = C2;
            this.m_MatchedLocally = B;
        }

        myDestroy() {
            this.m_ConcMatched1 = null;
            this.m_ConcMatched2 = null;
        }
    }
    ConceptUnification["__class"] = "PrologPlusCG.prolog.ConceptUnification";

}
namespace PrologPlusCG.prolog {
    /**
     * unifier(TeteRegle, _, ButCourant, _, _) :
     * si un arg du term tete est une valeur Vl et l'arg correspondant est une variable Vr
     * alors il faut ajouter dans le RecUnif courant une entree pour variable "" avec la
     * valeur Vl comme ValInd et propager la reference a ValInd pour la variable Vr
     * @class
     */
    export class Constraint {
        m_LeftData: any;

        m_levelOfLeftData: number;

        m_RightData: any;

        m_levelOfRightData: number;

        constructor(pLeftData: any, plevelOfLeftData: number, pRightData: any, plevelOfRightData: number) {
            if (this.m_LeftData === undefined) { this.m_LeftData = null; }
            if (this.m_levelOfLeftData === undefined) { this.m_levelOfLeftData = 0; }
            if (this.m_RightData === undefined) { this.m_RightData = null; }
            if (this.m_levelOfRightData === undefined) { this.m_levelOfRightData = 0; }
            this.m_LeftData = pLeftData;
            this.m_levelOfLeftData = plevelOfLeftData;
            this.m_RightData = pRightData;
            this.m_levelOfRightData = plevelOfRightData;
        }

        myDestroy() {
            this.m_LeftData = null;
            this.m_RightData = null;
        }
    }
    Constraint["__class"] = "PrologPlusCG.prolog.Constraint";

}
namespace PrologPlusCG.prolog {
    export class DataTypeVectorPair {
        vctSons: Array<string>;

        vectFathers: Array<string>;

        public constructor(vSons?: any, vFathers?: any) {
            if (((vSons != null && (vSons instanceof Array)) || vSons === null) && ((vFathers != null && (vFathers instanceof Array)) || vFathers === null)) {
                let __args = arguments;
                if (this.vctSons === undefined) { this.vctSons = null; } 
                if (this.vectFathers === undefined) { this.vectFathers = null; } 
                this.vctSons = vSons;
                this.vectFathers = vFathers;
            } else if (vSons === undefined && vFathers === undefined) {
                let __args = arguments;
                if (this.vctSons === undefined) { this.vctSons = null; } 
                if (this.vectFathers === undefined) { this.vectFathers = null; } 
                this.vctSons = <any>([]);
                this.vectFathers = <any>([]);
            } else throw new Error('invalid overload');
        }
    }
    DataTypeVectorPair["__class"] = "PrologPlusCG.prolog.DataTypeVectorPair";

}
namespace PrologPlusCG.prolog {
    export interface DataTypes {    }

    export namespace DataTypes {

        /**
         * Set of lexical token types: Possible values of nTokenType
         */
        export const uNumber: number = 0;

        export const uBoolean: number = 1;

        export const uIdentifier: number = 2;

        export const uString: number = 3;

        export const uVariable: number = 4;

        export const uConcept: number = 37;

        export const uObject: number = 43;

        export const uSet: number = 44;

        export const uEntails: number = 5;

        export const uComma: number = 6;

        export const uOpenParens: number = 7;

        export const uCloseParens: number = 8;

        export const uPipe: number = 9;

        export const uPeriod: number = 10;

        export const uTerm: number = 11;

        export const uVarList: number = 12;

        export const uList: number = 13;

        export const uCG: number = 14;

        export const uOpenBracket: number = 15;

        export const uCloseBracket: number = 16;

        export const uColon: number = 17;

        export const uEqualsSign: number = 18;

        export const uMinus: number = 19;

        export const uRightArrow: number = 20;

        export const uLeftArrow: number = 21;

        export const uSemicolon: number = 22;

        export const uExclamationMark: number = 38;

        export const uQuestionMark: number = 39;

        export const uGreaterThan: number = 23;

        export const uDoubleColon: number = 24;

        export const uOpenBrace: number = 25;

        export const uCloseBrace: number = 26;

        export const uAmpersAnd: number = 27;

        export const uIdentSpecial: number = 28;

        export const e_match: number = 29;

        export const e_project: number = 30;

        export const e_maximalJoin: number = 31;

        export const e_generalize: number = 32;

        export const e_subsume: number = 33;

        export const e_subsumeWithoutResult: number = 34;

        export const e_completeContract: number = 35;

        export const e_partialContract: number = 36;

        export const uReadData: number = 41;

        export const uReadSentence: number = 42;
    }

}
namespace PrologPlusCG.prolog {
    export class ExecException extends Error {
        static serialVersionUID: number = 3257566221942798640;

        public constructor(s: string) {
            super(s); this.message=s;
            (<any>Object).setPrototypeOf(this, ExecException.prototype);
        }
    }
    ExecException["__class"] = "PrologPlusCG.prolog.ExecException";

}
namespace PrologPlusCG.prolog {
    export class IdentifierIndexPair {
        idType: string;

        index: number;

        constructor(id: string, i: number) {
            if (this.idType === undefined) { this.idType = null; }
            if (this.index === undefined) { this.index = 0; }
            this.idType = id;
            this.index = i;
        }
    }
    IdentifierIndexPair["__class"] = "PrologPlusCG.prolog.IdentifierIndexPair";

}
namespace PrologPlusCG.prolog {
    export class PPCGEnv {
        /*private*/ strErrorMessage: string;

        public static PPCGVersion: string = "2.0.17.pre02";

        public program: any;

        public typeHierarchy: PrologPlusCG.prolog.TypeHierarchy;

        public pCurRule: PrologPlusCG.prolog.PrologRule;

        /*private*/ ProgramText: string;

        public vctResult: Array<any>;

        public bConvResultToString: boolean;

        public aResolution: PrologPlusCG.prolog.Resolution;

        public bInReadingMode: boolean;

        public io: PrologPlusCG.prolog.PPCGIO;

        public bWriteToDebugTree: boolean;

        public bWriteToToolTip: boolean;

        public bIsApplet: boolean;

        public bStopExec: boolean;

        public printer: PrologPlusCG.prolog.Printer;

        public compile: PrologPlusCG.prolog.Compile;

        public unification: PrologPlusCG.prolog.Unification;

        public unifyCG: PrologPlusCG.prolog.UnifyCG;

        public constructor() {
            if (this.strErrorMessage === undefined) { this.strErrorMessage = null; }
            this.program = null;
            this.typeHierarchy = null;
            this.pCurRule = null;
            this.ProgramText = "";
            this.vctResult = null;
            this.bConvResultToString = true;
            if (this.aResolution === undefined) { this.aResolution = null; }
            this.bInReadingMode = false;
            if (this.io === undefined) { this.io = null; }
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

        public recordErrorMessage(strMessage: string) {
            this.strErrorMessage += strMessage;
        }

        public getAndClearErrorMessage(): string {
            const result: string = this.strErrorMessage;
            this.strErrorMessage = "";
            return result;
        }

        /**
         * @param {string} programText The programText to set.
         */
        public setProgramText(programText: string) {
            this.ProgramText = programText;
        }

        /**
         * @return {string} Returns the programText.
         */
        public getProgramText(): string {
            return this.ProgramText;
        }

        public compileProgram(): boolean {
            let bResult: boolean = true;
            try {
                const bGenerateCode: boolean = false;
                this.compile.doCompile(bGenerateCode);
            } catch(e) {
                this.recordErrorMessage("Syntactic analysis did not succeed: \n" + e.toString());
                bResult = false;
                return bResult;
            }
            try {
                const bGenerateCode: boolean = true;
                this.compile.doCompile(bGenerateCode);
                bResult = true;
            } catch(e) {
                this.recordErrorMessage("Semantic analysis did not succeed" + e.toString());
                bResult = false;
            }
            return bResult;
        }

        public PurgeMemory() {
            this.setProgramText("");
            if (this.program != null){
                /* clear */(obj => { for (let member in obj) delete obj[member]; })(this.program);
                this.program = null;
            }
            if (this.typeHierarchy != null){
                this.typeHierarchy.clear();
            }
            this.typeHierarchy = null;
        }

        public Resolve$java_lang_String(quest: string): Array<any> {
            return this.Resolve$java_lang_String$boolean$boolean(quest, true, false);
        }

        public Resolve$java_lang_String$boolean(quest: string, convertRes: boolean): Array<any> {
            return this.Resolve$java_lang_String$boolean$boolean(quest, convertRes, false);
        }

        public Resolve$java_lang_String$boolean$boolean(quest: string, convertRes: boolean, modeSystmExprt: boolean): Array<any> {
            this.bConvResultToString = convertRes;
            let analysisSucceeded: boolean = true;
            try {
                this.compile.curLineNumber = 1;
                this.compile.compileQuery(quest);
            } catch(e1) {
                let strMsg: string;
                if (e1.message === ("null request")){
                    strMsg = "Error : null request";
                } else {
                    strMsg = e1.message;
                }
                this.recordErrorMessage(strMsg);
                analysisSucceeded = false;
            }
            this.vctResult = <any>([]);
            if (analysisSucceeded){
                this.aResolution = new PrologPlusCG.prolog.Resolution(this, false);
                this.aResolution.start();
                try {
                    this.aResolution.join();
                } catch(iex) {
                }
            }
            return this.vctResult;
        }

        public Resolve(quest?: any, convertRes?: any, modeSystmExprt?: any): Array<any> {
            if (((typeof quest === 'string') || quest === null) && ((typeof convertRes === 'boolean') || convertRes === null) && ((typeof modeSystmExprt === 'boolean') || modeSystmExprt === null)) {
                return <any>this.Resolve$java_lang_String$boolean$boolean(quest, convertRes, modeSystmExprt);
            } else if (((typeof quest === 'string') || quest === null) && ((typeof convertRes === 'boolean') || convertRes === null) && modeSystmExprt === undefined) {
                return <any>this.Resolve$java_lang_String$boolean(quest, convertRes);
            } else if (((typeof quest === 'string') || quest === null) && convertRes === undefined && modeSystmExprt === undefined) {
                return <any>this.Resolve$java_lang_String(quest);
            } else throw new Error('invalid overload');
        }
    }
    PPCGEnv["__class"] = "PrologPlusCG.prolog.PPCGEnv";

}
namespace PrologPlusCG.prolog {
    /**
     * @author ulrikp
     * @param {PrologPlusCG.prolog.PPCGEnv} myenv
     * @class
     */
    export abstract class PPCGIO {
        env: PrologPlusCG.prolog.PPCGEnv;

        public constructor(myenv: PrologPlusCG.prolog.PPCGEnv) {
            this.env = null;
            this.env = myenv;
        }

        public abstract appendToConsole(strToPrint: string);

        public abstract setPrompt(strToPrint: string);

        public abstract clearConsole();

        public abstract getNextQuery(): string;

        public abstract showMessageDialog(strMessage: string, strTitle: string);

        public abstract showPrompt();

        public showWaitCursor() {
        }

        public showNormalCursor() {
        }

        public abstract setProgramText(strProgram: string);

        public abstract readSomething(readingMode: number);
    }
    PPCGIO["__class"] = "PrologPlusCG.prolog.PPCGIO";

}
namespace PrologPlusCG.prolog {
    export class Printer implements PrologPlusCG.prolog.DataTypes {
        indVar: number;

        /*private*/ printedString: string;

        public alternatePrintString: string;

        /*private*/ env: PrologPlusCG.prolog.PPCGEnv;

        public constructor(myenv: PrologPlusCG.prolog.PPCGEnv) {
            this.indVar = 0;
            this.printedString = "";
            this.alternatePrintString = "";
            if (this.env === undefined) { this.env = null; }
            this.env = myenv;
        }

        flush() {
            const printedString: string = this.getPrintedString();
            this.env.io.appendToConsole(printedString);
            this.clearPrintedString();
        }

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
        public printCG(aCG: PrologPlusCG.cg.CG, level: number, vctConcsVisite: Array<PrologPlusCG.cg.Concept>, vctImprPrevuRels: Array<PrologPlusCG.cg.Relation>) {
            let bFound: boolean = false;
            let conc: PrologPlusCG.cg.Concept = null;
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>aCG.m_vctConcepts.length) && !bFound; ++listIndex1) {{
                conc = /* get */aCG.m_vctConcepts[listIndex1];
                if (/* isEmpty */(conc.m_vctIncomingRelations.length == 0)){
                    bFound = true;
                }
            };}
            if (bFound){
                this.printCGRelations(conc, aCG, level, vctConcsVisite, vctImprPrevuRels);
            } else {
                this.printCGRelations(<PrologPlusCG.cg.Concept>/* get */aCG.m_vctConcepts[0], aCG, level, vctConcsVisite, vctImprPrevuRels);
            }
            aCG.removeSpecialIdent();
        }

        public printCGRelations(conc: PrologPlusCG.cg.Concept, aCG: PrologPlusCG.cg.CG, level: number, vctConcsVisite: Array<PrologPlusCG.cg.Concept>, vctImprPrevuRels: Array<PrologPlusCG.cg.Relation>) {
            /* addElement */(vctConcsVisite.push(conc)>0);
            const numberOfChars: number = this.printConcept(conc, true, level, vctImprPrevuRels);
            if ((/* size */(<number>conc.m_vctIncomingRelations.length) + /* size */(<number>conc.m_vctOutgoingRelations.length)) > 1){
                this.printToConsole(" -\n");
                this.copyRelations(conc.m_vctOutgoingRelations, vctImprPrevuRels);
                this.copyRelations(conc.m_vctIncomingRelations, vctImprPrevuRels);
                this.printRelations(conc.m_vctOutgoingRelations, true, aCG, level, numberOfChars, vctConcsVisite, vctImprPrevuRels);
                if ((/* size */(<number>conc.m_vctOutgoingRelations.length) > 0) && (/* size */(<number>conc.m_vctIncomingRelations.length) > 0)){
                    this.printToConsole(",\n");
                }
                this.printRelations(conc.m_vctIncomingRelations, false, aCG, level, numberOfChars, vctConcsVisite, vctImprPrevuRels);
            } else if (!/* isEmpty */(conc.m_vctIncomingRelations.length == 0)){
                this.printRelation(/* get */conc.m_vctIncomingRelations[0], false, aCG, level, vctConcsVisite, vctImprPrevuRels);
            } else if (!/* isEmpty */(conc.m_vctOutgoingRelations.length == 0)){
                this.printRelation(/* get */conc.m_vctOutgoingRelations[0], true, aCG, level, vctConcsVisite, vctImprPrevuRels);
            }
        }

        public copyRelations(vctRels: Array<PrologPlusCG.cg.Relation>, vctImprPrevuRels: Array<PrologPlusCG.cg.Relation>) {
            if (/* isEmpty */(vctRels.length == 0)){
                return;
            }
            let rel: PrologPlusCG.cg.Relation;
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>vctRels.length); listIndex1++) {{
                rel = /* get */vctRels[listIndex1];
                /* addElement */(vctImprPrevuRels.push(rel)>0);
            };}
        }

        public printRelations(vctRels: Array<PrologPlusCG.cg.Relation>, Direction: boolean, aCG: PrologPlusCG.cg.CG, level: number, Decalage: number, vctConcsVisite: Array<PrologPlusCG.cg.Concept>, vctImprPrevuRels: Array<PrologPlusCG.cg.Relation>) {
            if (/* isEmpty */(vctRels.length == 0)){
                return;
            }
            let rel: PrologPlusCG.cg.Relation = /* get */vctRels[0];
            this.printSpaces(Decalage);
            this.printRelation(rel, Direction, aCG, level, vctConcsVisite, vctImprPrevuRels);
            for(let listIndex: number = 0; listIndex < /* size */(<number>vctRels.length); ++listIndex) {{
                rel = /* get */vctRels[listIndex];
                this.printToConsole(",\n");
                this.printSpaces(Decalage);
                this.printRelation(rel, Direction, aCG, level, vctConcsVisite, vctImprPrevuRels);
            };}
        }

        public printRelation(rel: PrologPlusCG.cg.Relation, estRelSort: boolean, unGC: PrologPlusCG.cg.CG, niv: number, vctConcsVisite: Array<PrologPlusCG.cg.Concept>, vctImprPrevuRels: Array<PrologPlusCG.cg.Relation>) {
            let DelOuv: string = null;
            let DelFerm: string = null;
            let conc: PrologPlusCG.cg.Concept = null;
            if (estRelSort){
                DelOuv = "-";
                DelFerm = "->";
                conc = rel.m_concDestination;
            } else {
                DelOuv = "<-";
                DelFerm = "-";
                conc = rel.m_concSource;
            }
            this.printToConsole(DelOuv);
            this.printPrologData(rel.m_pdRelationName, niv);
            this.printToConsole(DelFerm);
            if (/* contains */(vctConcsVisite.indexOf(<any>(conc)) >= 0)){
                this.printConcept(conc, false, niv, vctImprPrevuRels);
            } else {
                this.printCGConcept(rel, estRelSort, conc, unGC, niv, vctConcsVisite, vctImprPrevuRels);
            }
        }

        public printCGConcept(rel: PrologPlusCG.cg.Relation, estRelSort: boolean, conc: PrologPlusCG.cg.Concept, unGC: PrologPlusCG.cg.CG, niv: number, vctConcsVisite: Array<PrologPlusCG.cg.Concept>, vctImprPrevuRels: Array<PrologPlusCG.cg.Relation>) {
            /* addElement */(vctConcsVisite.push(conc)>0);
            if (!estRelSort){
                /* removeElement */(a => { let index = a.indexOf(rel); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(conc.m_vctOutgoingRelations);
            } else {
                /* removeElement */(a => { let index = a.indexOf(rel); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(conc.m_vctIncomingRelations);
            }
            const nbreCars: number = this.printConcept(conc, true, niv, vctImprPrevuRels);
            const vctRelEntrsAImpr: Array<PrologPlusCG.cg.Relation> = <any>([]);
            this.relationsToPrint(conc.m_vctIncomingRelations, vctRelEntrsAImpr, vctImprPrevuRels);
            const vctRelSortsAImpr: Array<PrologPlusCG.cg.Relation> = <any>([]);
            this.relationsToPrint(conc.m_vctOutgoingRelations, vctRelSortsAImpr, vctImprPrevuRels);
            if ((/* size */(<number>vctRelEntrsAImpr.length) + /* size */(<number>vctRelSortsAImpr.length)) > 1){
                this.printToConsole(" -\n");
                this.printRelations(vctRelSortsAImpr, true, unGC, niv, nbreCars, vctConcsVisite, vctImprPrevuRels);
                if ((/* size */(<number>vctRelSortsAImpr.length) > 0) && (/* size */(<number>vctRelEntrsAImpr.length) > 0)){
                    this.printToConsole(",\n");
                }
                this.printRelations(vctRelEntrsAImpr, false, unGC, niv, nbreCars, vctConcsVisite, vctImprPrevuRels);
                this.printToConsole(";");
            } else if (!/* isEmpty */(vctRelEntrsAImpr.length == 0)){
                this.printRelation(/* get */vctRelEntrsAImpr[0], false, unGC, niv, vctConcsVisite, vctImprPrevuRels);
            } else if (!/* isEmpty */(vctRelSortsAImpr.length == 0)){
                this.printRelation(/* get */vctRelSortsAImpr[0], true, unGC, niv, vctConcsVisite, vctImprPrevuRels);
            }
            /* clear */(vctRelEntrsAImpr.length = 0);
            /* clear */(vctRelSortsAImpr.length = 0);
            if (!estRelSort){
                /* addElement */(conc.m_vctOutgoingRelations.push(rel)>0);
            } else {
                /* addElement */(conc.m_vctIncomingRelations.push(rel)>0);
            }
        }

        public relationsToPrint(vctInitRels: Array<PrologPlusCG.cg.Relation>, vctRelsAImpr: Array<PrologPlusCG.cg.Relation>, vctImprPrevuRels: Array<PrologPlusCG.cg.Relation>) {
            let rel: PrologPlusCG.cg.Relation;
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>vctInitRels.length); ++listIndex1) {{
                rel = /* get */vctInitRels[listIndex1];
                if (!/* contains */(vctImprPrevuRels.indexOf(<any>(rel)) >= 0)){
                    /* addElement */(vctRelsAImpr.push(rel)>0);
                    /* addElement */(vctImprPrevuRels.push(rel)>0);
                }
            };}
        }

        createReferenceSpecification(): string {
            this.indVar++;
            return "*" + /* valueOf */String(this.indVar).toString();
        }

        public printConcept(conc: PrologPlusCG.cg.Concept, premiereFois: boolean, niv: number, vctImprPrevuRels: Array<PrologPlusCG.cg.Relation>): number {
            if (conc.m_pdType == null){
                this.printPrologData(conc.m_pdReferent, niv);
            } else {
                this.printToConsole("[");
                this.printPrologData(conc.m_pdType, niv);
                let trouve: boolean = false;
                if (premiereFois && (conc.m_pdReferent == null) && (vctImprPrevuRels != null)){
                    let rel: PrologPlusCG.cg.Relation;
                    for(let listIndex1: number = 0; listIndex1 < /* size */(<number>conc.m_vctIncomingRelations.length) && !trouve; ++listIndex1) {{
                        rel = /* get */conc.m_vctIncomingRelations[listIndex1];
                        if (/* contains */(vctImprPrevuRels.indexOf(<any>(rel)) >= 0)){
                            trouve = true;
                        }
                    };}
                    for(let listIndex2: number = 0; listIndex2 < /* size */(<number>conc.m_vctOutgoingRelations.length) && !trouve; ++listIndex2) {{
                        rel = /* get */conc.m_vctOutgoingRelations[listIndex2];
                        if (/* contains */(vctImprPrevuRels.indexOf(<any>(rel)) >= 0)){
                            trouve = true;
                        }
                    };}
                    if (trouve){
                        conc.m_pdReferent = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentSpecial, this.createReferenceSpecification());
                    }
                }
                if (conc.m_pdReferent != null){
                    this.printToConsole(" : ");
                    this.printPrologData(conc.m_pdReferent, niv);
                }
                if (premiereFois && (conc.m_pdValue != null)){
                    this.printToConsole(" = ");
                    this.printPrologData(conc.m_pdValue, niv);
                }
                this.printToConsole("]");
            }
            return this.numberOfCharsOnCurrentLine();
        }

        printSpaces(nbreBlancs: number) {
            const s: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
            for(let i: number = 0; i <= nbreBlancs; i++) {/* append */(sb => { sb.str += <any>' '; return sb; })(s);}
            this.printToConsole(/* toString */s.str);
        }

        /**
         * Universal > Person, Action.
         * Person > Man, Woman.
         * Action > Eat, Work.
         * 
         * [Man]-agnt->[Work].
         * [Woman]-agnt->[Work].
         * @return {number}
         */
        numberOfCharsOnCurrentLine(): number {
            let myString: string;
            if (this.env.bWriteToDebugTree || this.env.bWriteToToolTip){
                console.info("UP100: env.bWriteToDebugTree || env.bWriteToToolTip");
                myString = this.alternatePrintString;
            } else {
                myString = this.printedString;
            }
            const nLastIndexOfNewline: number = myString.lastIndexOf('\n');
            if (nLastIndexOfNewline === -1){
                return myString.length;
            } else {
                return myString.length - nLastIndexOfNewline;
            }
        }

        public printTerm$PrologPlusCG_prolog_PrologTerm(pTerme: PrologPlusCG.prolog.PrologTerm) {
            this.printTerm$PrologPlusCG_prolog_PrologTerm$int(pTerme, -1);
        }

        public printTerm$PrologPlusCG_prolog_PrologTerm$int(pTerm: PrologPlusCG.prolog.PrologTerm, level: number) {
            this.printPrologData(<PrologPlusCG.prolog.PrologData>pTerm.get(0), level);
            const IndDernier: number = pTerm.size() - 1;
            if (IndDernier >= 1){
                this.printToConsole("(");
                this.printPrologData(<PrologPlusCG.prolog.PrologData>pTerm.elementAt(1), level);
                for(let i: number = 2; i <= IndDernier; i++) {{
                    this.printToConsole(", ");
                    this.printPrologData(<PrologPlusCG.prolog.PrologData>pTerm.elementAt(i), level);
                };}
                this.printToConsole(")");
            }
        }

        public printTerm(pTerm?: any, level?: any) {
            if (((pTerm != null && pTerm instanceof <any>PrologPlusCG.prolog.PrologTerm) || pTerm === null) && ((typeof level === 'number') || level === null)) {
                return <any>this.printTerm$PrologPlusCG_prolog_PrologTerm$int(pTerm, level);
            } else if (((pTerm != null && pTerm instanceof <any>PrologPlusCG.prolog.PrologTerm) || pTerm === null) && level === undefined) {
                return <any>this.printTerm$PrologPlusCG_prolog_PrologTerm(pTerm);
            } else throw new Error('invalid overload');
        }

        public printSet(pLstPrlg: PrologPlusCG.prolog.PrologList, niv: number) {
            this.printToConsole("{");
            const nbreElems: number = pLstPrlg.size();
            let indElemCour: number = 0;
            try {
                this.printPrologData(<PrologPlusCG.prolog.PrologData>pLstPrlg.get(indElemCour), niv);
                indElemCour++;
            } catch(aiobex) {
            }
            while((indElemCour < nbreElems)) {{
                this.printToConsole(", ");
                this.printPrologData(<PrologPlusCG.prolog.PrologData>pLstPrlg.get(indElemCour), niv);
                indElemCour++;
            }};
            this.printToConsole("}");
        }

        public printList(pLstPrlg: PrologPlusCG.prolog.PrologList, niv: number) {
            this.printToConsole("(");
            let nbreElems: number = pLstPrlg.size();
            let indElemCour: number = 0;
            if (nbreElems > 0){
                this.printPrologData(<PrologPlusCG.prolog.PrologData>pLstPrlg.elementAt(indElemCour), niv);
                indElemCour++;
            }
            while((indElemCour < nbreElems)) {{
                if (((<PrologPlusCG.prolog.PrologData>pLstPrlg.elementAt(indElemCour)).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList) && (niv !== -1)){
                    let contr: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(<PrologPlusCG.prolog.PrologData>pLstPrlg.elementAt(indElemCour), niv);
                    if (contr.pData == null){
                        this.printToConsole("|FREE");
                        indElemCour = nbreElems;
                    } else {
                        pLstPrlg = <PrologPlusCG.prolog.PrologList>contr.pData.data;
                        nbreElems = pLstPrlg.size();
                        indElemCour = 0;
                        niv = contr.index;
                        if (nbreElems > 0){
                            this.printToConsole(", ");
                            this.printPrologData(<PrologPlusCG.prolog.PrologData>pLstPrlg.elementAt(indElemCour), niv);
                            indElemCour++;
                        }
                    }
                    contr = null;
                } else {
                    if ((<PrologPlusCG.prolog.PrologData>pLstPrlg.elementAt(indElemCour)).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList){
                        this.printToConsole("|");
                    } else {
                        this.printToConsole(", ");
                    }
                    this.printPrologData(<PrologPlusCG.prolog.PrologData>pLstPrlg.elementAt(indElemCour), niv);
                    indElemCour++;
                }
            }};
            this.printToConsole(")");
        }

        public printPrologData(pDon: PrologPlusCG.prolog.PrologData, niv: number, uChaineShouldBeStrippedOfQuotations: boolean = false) {
            if (pDon == null){
                this.printToConsole("FREE");
            } else {
                switch((pDon.typeOfData)) {
                case 0 /* uNumber */:
                    this.printToConsole((<number>pDon.data).toString());
                    break;
                case 1 /* uBoolean */:
                    this.printToConsole((<boolean>pDon.data).toString());
                    break;
                case 28 /* uIdentSpecial */:
                case 2 /* uIdentifier */:
                case 10 /* uPeriod */:
                case 6 /* uComma */:
                case 22 /* uSemicolon */:
                case 38 /* uExclamationMark */:
                case 39 /* uQuestionMark */:
                    this.printToConsole(<string>pDon.data);
                    break;
                case 3 /* uString */:
                    if (uChaineShouldBeStrippedOfQuotations){
                        let s: string = (<string>pDon.data);
                        if (s.length >= 2 && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s.charAt(0)) == '\"'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s.charAt(s.length - 1)) == '\"'.charCodeAt(0)){
                            this.printToConsole(s.substring(1, s.length - 1));
                        } else {
                            this.printToConsole(s);
                        }
                        s = null;
                    } else {
                        this.printToConsole(<string>pDon.data);
                    }
                    break;
                case 4 /* uVariable */:
                case 12 /* uVarList */:
                    if (niv === -1){
                        this.printToConsole(<string>pDon.data);
                    } else {
                        let contr: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pDon, niv);
                        if (contr.pData != null){
                            this.printPrologData(contr.pData, contr.index, uChaineShouldBeStrippedOfQuotations);
                        } else {
                            this.printToConsole(<string>pDon.data);
                        }
                        contr = null;
                    }
                    break;
                case 11 /* uTerm */:
                    this.printTerm$PrologPlusCG_prolog_PrologTerm$int(<PrologPlusCG.prolog.PrologTerm>pDon.data, niv);
                    break;
                case 37 /* uConcept */:
                    this.printConcept(<PrologPlusCG.cg.Concept>pDon.data, true, niv, null);
                    break;
                case 14 /* uCG */:
                    {
                        let vctConcsVisite: Array<PrologPlusCG.cg.Concept> = <any>([]);
                        let vctImprPrevuRels: Array<PrologPlusCG.cg.Relation> = <any>([]);
                        this.printCG(<PrologPlusCG.cg.CG>pDon.data, niv, vctConcsVisite, vctImprPrevuRels);
                        /* clear */(vctConcsVisite.length = 0);
                        vctConcsVisite = null;
                        /* clear */(vctImprPrevuRels.length = 0);
                        vctImprPrevuRels = null;
                    };
                    break;
                case 13 /* uList */:
                    this.printList(<PrologPlusCG.prolog.PrologList>pDon.data, niv);
                    break;
                case 44 /* uSet */:
                    this.printSet(<PrologPlusCG.prolog.PrologList>pDon.data, niv);
                    break;
                case 43 /* uObject */:
                    this.printToConsole(pDon.data.toString());
                }
            }
        }

        public printPrologProgram() {
            const keys: Array<string> = /* keySet */Object.keys(this.env.program);
            for(let index = 0; index < keys.length; index++) {
                let key = keys[index];
                {
                    const value: PrologPlusCG.prolog.RuleVector = /* get */((m,k) => m[k]===undefined?null:m[k])(this.env.program, key);
                    this.printRules(value, key);
                    this.printToConsole("\n");
                }
            }
        }

        public printRules(pRegles: PrologPlusCG.prolog.RuleVector, cle: string) {
            for(let listIndex: number = 0; listIndex < pRegles.size(); ++listIndex) {{
                this.printRule(pRegles.get(listIndex), cle);
            };}
        }

        public printRule(pRegle: PrologPlusCG.prolog.PrologRule, cle: string) {
            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(cle, this.env.compile.valSysGEN)){
                const unTrmTmp: PrologPlusCG.prolog.PrologTerm = <PrologPlusCG.prolog.PrologTerm>pRegle.getAt(0).getAt(1).data;
                this.printGoal(unTrmTmp);
            } else {
                this.printGoal(<PrologPlusCG.prolog.PrologTerm>pRegle.get(0));
            }
            if (pRegle.size() > 1){
                if (cle === this.env.compile.valSysSP){
                    this.printToConsole(" > ");
                    this.printTail(pRegle);
                } else if (cle === this.env.compile.valSysINST){
                    this.printToConsole(" = ");
                    this.printTail(pRegle);
                } else if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(cle, this.env.compile.valSysGEN)){
                    this.printToConsole(" <- ");
                    this.printGoal(<PrologPlusCG.prolog.PrologTerm>pRegle.getAt(1).getAt(1).data);
                } else {
                    this.printToConsole(" :- ");
                    this.printTail(pRegle);
                }
            }
            this.printToConsole(".\n");
        }

        public printTail(pRegle: PrologPlusCG.prolog.PrologRule) {
            const AvDernier: number = pRegle.size() - 2;
            for(let i: number = 1; i <= AvDernier; i++) {{
                this.printGoal(<PrologPlusCG.prolog.PrologTerm>pRegle.elementAt(i));
                this.printToConsole(", ");
            };}
            this.printGoal(<PrologPlusCG.prolog.PrologTerm>pRegle.elementAt(AvDernier + 1));
        }

        public printGoal(pTerme: PrologPlusCG.prolog.PrologTerm) {
            this.indVar = 0;
            const donIdTerm: PrologPlusCG.prolog.PrologData = <PrologPlusCG.prolog.PrologData>pTerme.get(0);
            if ((donIdTerm.typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (donIdTerm.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)){
                this.printPrologData(donIdTerm, -1);
            } else if ((donIdTerm.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)((<string>donIdTerm.data), this.env.compile.valSysCleBtCp)){
                this.printPrologData(<PrologPlusCG.prolog.PrologData>pTerme.elementAt(1), -1);
                this.printToConsole("::");
                this.printPrologData(<PrologPlusCG.prolog.PrologData>pTerme.elementAt(2), -1);
            } else {
                this.printTerm$PrologPlusCG_prolog_PrologTerm$int(pTerme, -1);
            }
        }

        public printToConsole(s: string) {
            if (this.env.bWriteToDebugTree || this.env.bWriteToToolTip){
                this.alternatePrintString += s;
            } else {
                this.printedString += s;
            }
        }

        public getPrintedString(): string {
            return this.printedString;
        }

        public clearPrintedString() {
            this.printedString = "";
        }

        writeOrRecordResult(resolutionWithInterface: boolean) {
            this.clearPrintedString();
            if (resolutionWithInterface){
                this.writeResult();
            } else {
                this.recordResult();
            }
        }

        writeResult() {
            this.printToConsole("{");
            let recUnif: PrologPlusCG.prolog.UnificationRecord = <PrologPlusCG.prolog.UnificationRecord>this.env.unification.Unif_Stack.get(0);
            if (recUnif.isEmpty()){
                this.printToConsole("}\n");
            } else {
                let sVar: string;
                let sDerVar: string = /* lastElement */(a => a.length==0 ? null : a[a.length-1])(this.env.compile.vctVariableIdentifiersInQuery);
                /* removeElementAt */this.env.compile.vctVariableIdentifiersInQuery.splice(/* size */(<number>this.env.compile.vctVariableIdentifiersInQuery.length) - 1, 1);
                let pCLContr: PrologPlusCG.prolog.VariableIndexPairList;
                for(let listIndex1: number = 0; listIndex1 < /* size */(<number>this.env.compile.vctVariableIdentifiersInQuery.length); ++listIndex1) {{
                    sVar = /* get */this.env.compile.vctVariableIdentifiersInQuery[listIndex1];
                    this.printToConsole(sVar + "=");
                    pCLContr = <PrologPlusCG.prolog.VariableIndexPairList>recUnif.get(sVar);
                    this.indVar = 0;
                    if ((pCLContr != null) && (pCLContr.ValInd != null)){
                        this.printPrologData(pCLContr.ValInd.pData, pCLContr.ValInd.index);
                    } else {
                        this.printPrologData(null, 0);
                    }
                    this.printToConsole(", ");
                };}
                /* addElement */(this.env.compile.vctVariableIdentifiersInQuery.push(sDerVar)>0);
                this.printToConsole(sDerVar + "=");
                pCLContr = <PrologPlusCG.prolog.VariableIndexPairList>recUnif.get(sDerVar);
                this.indVar = 0;
                if ((pCLContr != null) && (pCLContr.ValInd != null)){
                    this.printPrologData(pCLContr.ValInd.pData, pCLContr.ValInd.index);
                } else {
                    this.printPrologData(null, 0);
                }
                sVar = sDerVar = null;
                pCLContr = null;
                this.printToConsole("}\n");
            }
            this.flush();
            recUnif = null;
        }

        recordResult() {
            let recUnif: PrologPlusCG.prolog.UnificationRecord = <PrologPlusCG.prolog.UnificationRecord>this.env.unification.Unif_Stack.get(0);
            if (!recUnif.isEmpty()){
                const hashResult: any = <any>({});
                let strVar: string;
                let pCLContr: PrologPlusCG.prolog.VariableIndexPairList;
                for(let listIndex1: number = 0; listIndex1 < /* size */(<number>this.env.compile.vctVariableIdentifiersInQuery.length); ++listIndex1) {{
                    strVar = /* get */this.env.compile.vctVariableIdentifiersInQuery[listIndex1];
                    pCLContr = <PrologPlusCG.prolog.VariableIndexPairList>recUnif.get(strVar);
                    this.indVar = 0;
                    let sValue: string = null;
                    if ((pCLContr != null) && (pCLContr.ValInd != null) && this.env.bConvResultToString){
                        this.alternatePrintString = "";
                        this.clearPrintedString();
                        this.printPrologData(pCLContr.ValInd.pData, pCLContr.ValInd.index);
                        sValue = this.alternatePrintString;
                        this.alternatePrintString = "";
                        this.clearPrintedString();
                        /* put */(hashResult[strVar] = sValue);
                    } else if ((pCLContr != null) && (pCLContr.ValInd != null)){
                        this.alternatePrintString = "";
                        this.clearPrintedString();
                        this.printPrologData(pCLContr.ValInd.pData, pCLContr.ValInd.index);
                        let unVct: Array<string> = null;
                        try {
                            unVct = this.env.compile.compileAlternatePrintString(this.alternatePrintString);
                        } catch(cpExc) {
                        }
                        this.alternatePrintString = "";
                        this.clearPrintedString();
                        /* put */(hashResult[strVar] = /* toString */('['+unVct.join(', ')+']'));
                    } else {
                        sValue = "FREE";
                        /* put */(hashResult[strVar] = sValue);
                    }
                };}
                strVar = null;
                pCLContr = null;
                /* addElement */(this.env.vctResult.push(hashResult)>0);
            }
            recUnif = null;
        }
    }
    Printer["__class"] = "PrologPlusCG.prolog.Printer";
    Printer["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];


}
namespace PrologPlusCG.prolog {
    export class PrologData implements PrologPlusCG.prolog.DataTypes {
        public data: any;

        public typeOfData: number;

        public constructor(typObj?: any, ObjPrlg?: any) {
            if (((typeof typObj === 'number') || typObj === null) && ((ObjPrlg != null) || ObjPrlg === null)) {
                let __args = arguments;
                if (this.data === undefined) { this.data = null; } 
                if (this.typeOfData === undefined) { this.typeOfData = 0; } 
                this.typeOfData = typObj;
                this.data = ObjPrlg;
            } else if (typObj === undefined && ObjPrlg === undefined) {
                let __args = arguments;
                if (this.data === undefined) { this.data = null; } 
                if (this.typeOfData === undefined) { this.typeOfData = 0; } 
            } else throw new Error('invalid overload');
        }

        public myDestroy() {
            switch((this.typeOfData)) {
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
                    (<PrologPlusCG.prolog.PrologTerm>this.data).myDestroy();
                    this.data = null;
                };
                break;
            case 44 /* uSet */:
            case 13 /* uList */:
                (<PrologPlusCG.prolog.PrologList>this.data).myDestroy();
                break;
            case 14 /* uCG */:
                (<PrologPlusCG.cg.CG>this.data).myDestroy();
                break;
            }
        }

        public valString(): string {
            return <string>this.data;
        }

        public myCopy(): PrologData {
            let nouvObj: any = null;
            switch((this.typeOfData)) {
            case 0 /* uNumber */:
                if (typeof this.data === 'number'){
                    const valLong: number = /* longValue */(<number>this.data);
                    nouvObj = new Number(valLong).valueOf();
                } else {
                    const valDble: number = /* doubleValue */(<number>this.data);
                    nouvObj = new Number(valDble).valueOf();
                }
                break;
            case 1 /* uBoolean */:
                {
                    const valBool: boolean = /* booleanValue */(<boolean>this.data);
                    if (valBool){
                        nouvObj = true;
                    } else {
                        nouvObj = false;
                    }
                };
                break;
            case 2 /* uIdentifier */:
            case 3 /* uString */:
            case 4 /* uVariable */:
            case 12 /* uVarList */:
                nouvObj = <string>this.data;
                break;
            case 11 /* uTerm */:
                nouvObj = (<PrologPlusCG.prolog.PrologTerm>this.data).myCopy();
                break;
            case 44 /* uSet */:
            case 13 /* uList */:
                nouvObj = (<PrologPlusCG.prolog.PrologList>this.data).myCopy();
                break;
            case 14 /* uCG */:
                nouvObj = (<PrologPlusCG.cg.CG>this.data).myCopy();
                break;
            }
            return new PrologData(this.typeOfData, nouvObj);
        }
    }
    PrologData["__class"] = "PrologPlusCG.prolog.PrologData";
    PrologData["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];


}
namespace PrologPlusCG.prolog {
    export class PrologDataIndexPair {
        public pData: PrologPlusCG.prolog.PrologData;

        public index: number;

        public constructor(data?: any, i?: any) {
            if (((data != null && data instanceof <any>PrologPlusCG.prolog.PrologData) || data === null) && ((typeof i === 'number') || i === null)) {
                let __args = arguments;
                if (this.pData === undefined) { this.pData = null; } 
                if (this.index === undefined) { this.index = 0; } 
                this.pData = data;
                this.index = i;
            } else if (data === undefined && i === undefined) {
                let __args = arguments;
                if (this.pData === undefined) { this.pData = null; } 
                if (this.index === undefined) { this.index = 0; } 
                this.pData = null;
                this.index = 0;
            } else throw new Error('invalid overload');
        }
    }
    PrologDataIndexPair["__class"] = "PrologPlusCG.prolog.PrologDataIndexPair";

}
namespace PrologPlusCG.prolog {
    export class PrologDataVector {
        /*private*/ vec: Array<PrologPlusCG.prolog.PrologData>;

        public constructor(a?: any, b?: any) {
            if (((typeof a === 'number') || a === null) && ((typeof b === 'number') || b === null)) {
                let __args = arguments;
                this.vec = null;
                this.vec = <any>([]);
            } else if (a === undefined && b === undefined) {
                let __args = arguments;
                this.vec = null;
                this.vec = <any>([]);
            } else throw new Error('invalid overload');
        }

        public get(index: number): PrologPlusCG.prolog.PrologData {
            return /* get */this.vec[index];
        }

        public clear() {
            /* clear */(this.vec.length = 0);
        }

        public elementAt(index: number): PrologPlusCG.prolog.PrologData {
            return this.get(index);
        }

        public lastElement(): PrologPlusCG.prolog.PrologData {
            const mySize: number = this.size();
            if (mySize === 0){
                throw Object.defineProperty(new Error(), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.util.NoSuchElementException','java.lang.Exception'] });
            } else {
                return this.get(mySize - 1);
            }
        }

        public set(index: number, pd: PrologPlusCG.prolog.PrologData) {
            /* set */(this.vec[index] = pd);
        }

        public isEmpty(): boolean {
            return /* size */(<number>this.vec.length) === 0;
        }

        public size(): number {
            return /* size */(<number>this.vec.length);
        }

        public addElement(pd: PrologPlusCG.prolog.PrologData) {
            /* add */(this.vec.push(pd)>0);
        }

        public add(pd: PrologPlusCG.prolog.PrologData) {
            /* add */(this.vec.push(pd)>0);
        }

        public shuffle$() {
            const rnd: PrologPlusCG.prolog.RandomSource = new PrologPlusCG.prolog.RandomSource();
            this.shuffle$PrologPlusCG_prolog_RandomSource(rnd);
        }

        public shuffle$PrologPlusCG_prolog_RandomSource(rnd: PrologPlusCG.prolog.RandomSource) {
            const mySize: number = this.size();
            for(let i: number = mySize; i > 0; i--) {{
                this.swap(i - 1, (<number>(rnd.nextRnd() % mySize)|0));
            };}
        }

        public shuffle(rnd?: any) {
            if (((rnd != null && rnd instanceof <any>PrologPlusCG.prolog.RandomSource) || rnd === null)) {
                return <any>this.shuffle$PrologPlusCG_prolog_RandomSource(rnd);
            } else if (rnd === undefined) {
                return <any>this.shuffle$();
            } else throw new Error('invalid overload');
        }

        public swap(i1: number, i2: number) {
            const tmp: PrologPlusCG.prolog.PrologData = this.get(i1);
            this.set(i1, this.get(i2));
            this.set(i2, tmp);
        }

        public trimToSize() {
        }
    }
    PrologDataVector["__class"] = "PrologPlusCG.prolog.PrologDataVector";

}
namespace PrologPlusCG.prolog {
    export class PrologRule {
        vec: Array<PrologPlusCG.prolog.PrologTerm>;

        public constructor() {
            if (this.vec === undefined) { this.vec = null; }
            this.vec = <any>([]);
        }

        public getAt(i: number): PrologPlusCG.prolog.PrologTerm {
            return /* get */this.vec[i];
        }

        public get(i: number): PrologPlusCG.prolog.PrologTerm {
            return /* get */this.vec[i];
        }

        public elementAt(i: number): PrologPlusCG.prolog.PrologTerm {
            return /* get */this.vec[i];
        }

        public set(index: number, pt: PrologPlusCG.prolog.PrologTerm) {
            /* set */(this.vec[index] = pt);
        }

        public trimToSize() {
        }

        public size(): number {
            return /* size */(<number>this.vec.length);
        }

        public clear() {
            /* clear */(this.vec.length = 0);
        }

        public myDestroy() {
            if (this.size() === 0){
                return;
            } else {
                let aTerm: PrologPlusCG.prolog.PrologTerm;
                for(let listIndex1: number = 0; listIndex1 < /* size */(<number>this.vec.length); ++listIndex1) {{
                    aTerm = /* get */this.vec[listIndex1];
                    aTerm.myDestroy();
                };}
                this.clear();
            }
        }

        public hasOnlyAtoms(env: PrologPlusCG.prolog.PPCGEnv): boolean {
            if (this.size() === 0){
                return true;
            } else {
                let aTerm: PrologPlusCG.prolog.PrologTerm;
                for(let listIndex1: number = 0; listIndex1 < /* size */(<number>this.vec.length); ++listIndex1) {{
                    aTerm = /* get */this.vec[listIndex1];
                    if (!aTerm.hasOnlyAtoms(env)){
                        return false;
                    }
                };}
                return true;
            }
        }

        public firstElement(): PrologPlusCG.prolog.PrologTerm {
            return /* get */this.vec[0];
        }

        public addTerm(terme: PrologPlusCG.prolog.PrologTerm) {
            /* addElement */(this.vec.push(terme)>0);
        }
    }
    PrologRule["__class"] = "PrologPlusCG.prolog.PrologRule";

}
namespace PrologPlusCG.prolog {
    export class RandomSource {
        /*private*/ curSeed: number;

        public constructor() {
            if (this.curSeed === undefined) { this.curSeed = 0; }
            const nowDate: Date = new Date();
            this.curSeed = nowDate.getTime();
        }

        public setSeed(newSeed: number) {
            this.curSeed = newSeed;
        }

        public next(bits: number): number {
            this.advance();
            return (<number>(this.curSeed >>> (31 - bits))|0);
        }

        public nextRnd(): number {
            this.advance();
            return this.curSeed;
        }

        public nextLong(): number {
            return ((n => n<0?Math.ceil(n):Math.floor(n))(<number>this.next(31)));
        }

        public advance() {
            this.curSeed = (this.curSeed * 6155981 + 2865) & ((1 << 31) - 1);
        }

        public nextDouble(): number {
            let nextVal: number = ((n => n<0?Math.ceil(n):Math.floor(n))(<number>(this.next(15))) << 15) + this.next(15);
            if (nextVal < 0){
                nextVal = -nextVal;
            }
            return (<number>nextVal) / <number>(1 << 30);
        }
    }
    RandomSource["__class"] = "PrologPlusCG.prolog.RandomSource";

}
namespace PrologPlusCG.prolog {
    export class RelationUnification {
        m_RelMatched1: PrologPlusCG.cg.Relation;

        m_RelMatched2: PrologPlusCG.cg.Relation;

        constructor(r1: PrologPlusCG.cg.Relation, r2: PrologPlusCG.cg.Relation) {
            if (this.m_RelMatched1 === undefined) { this.m_RelMatched1 = null; }
            if (this.m_RelMatched2 === undefined) { this.m_RelMatched2 = null; }
            this.m_RelMatched1 = r1;
            this.m_RelMatched2 = r2;
        }

        myDestroy() {
            this.m_RelMatched1 = null;
            this.m_RelMatched2 = null;
        }
    }
    RelationUnification["__class"] = "PrologPlusCG.prolog.RelationUnification";

}
namespace PrologPlusCG.prolog {
    export class Resolution implements PrologPlusCG.prolog.DataTypes {
        Exec_Stack: PrologPlusCG.prolog.ResolutionStack;

        Return_Stack: PrologPlusCG.prolog.ResolutionStack;

        pRules: PrologPlusCG.prolog.RuleVector;

        globalPrlgPCGObjs: any;

        rndRandom: PrologPlusCG.prolog.RandomSource;

        programModified: boolean;

        cptVarBid: number;

        strEndOfPredefinedGoals: string;

        PredefinedGoals: string[];

        bResolveWithInterface: boolean;

        /*private*/ env: PrologPlusCG.prolog.PPCGEnv;

        public constructor(myenv: PrologPlusCG.prolog.PPCGEnv, mode: boolean) {
            this.Exec_Stack = new PrologPlusCG.prolog.ResolutionStack();
            this.Return_Stack = new PrologPlusCG.prolog.ResolutionStack();
            this.pRules = null;
            this.globalPrlgPCGObjs = <any>({});
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

        public start() {
            this.run();
        }

        public join() {
        }

        public run() {
            if (this.bResolveWithInterface){
                try {
                    this.env.io.showWaitCursor();
                    this.executeQuery();
                } catch(__e) {
                    if(__e != null && __e instanceof <any>PrologPlusCG.prolog.CompileException) {
                        const cpleExc: PrologPlusCG.prolog.CompileException = <PrologPlusCG.prolog.CompileException>__e;
                        this.env.io.showMessageDialog(cpleExc.message, "Warning");

                    }
                    if(__e != null && __e instanceof <any>PrologPlusCG.prolog.ExecException) {
                        const eexec: PrologPlusCG.prolog.ExecException = <PrologPlusCG.prolog.ExecException>__e;
                        if (eexec.message === ("program null")){
                            this.env.io.showMessageDialog("Please, Compile your program first.", "Warning");
                        } else {
                            this.env.io.appendToConsole(eexec.message + "\n");
                        }

                    }
                }
                this.env.io.showNormalCursor();
                this.env.io.showPrompt();
            } else {
                try {
                    this.executeQuery();
                } catch(__e) {
                    if(__e != null && __e instanceof <any>PrologPlusCG.prolog.CompileException) {
                        const cpleExc: PrologPlusCG.prolog.CompileException = <PrologPlusCG.prolog.CompileException>__e;
                        const strMsg: string = "Compiler Warning : " + cpleExc.message;
                        this.env.recordErrorMessage(strMsg);

                    }
                    if(__e != null && __e instanceof <any>PrologPlusCG.prolog.ExecException) {
                        const eexec: PrologPlusCG.prolog.ExecException = <PrologPlusCG.prolog.ExecException>__e;
                        const strMsg: string = "Execution Warning : " + eexec.message;
                        this.env.recordErrorMessage(strMsg);

                    }
                }
            }
        }

        public executeQuery() {
            let package_is_known: boolean = false;
            let unifiable: boolean = false;
            let contr: PrologPlusCG.prolog.PrologDataIndexPair = null;
            let TermRes: PrologPlusCG.prolog.TermToBeResolved = null;
            this.cptVarBid = 0;
            this.env.unification.Unif_Stack.makeEmpty();
            this.Exec_Stack.makeEmpty();
            this.Return_Stack.makeEmpty();
            this.env.unification.Unif_Stack.pushEmptyRecord();
            this.push_tail(this.env.pCurRule, 0, 0, -1);
            this.env.pCurRule.clear();
            this.env.pCurRule = null;
            let finished: boolean = false;
            let solvable: boolean = false;
            this.programModified = false;
            while((!finished && !this.env.bStopExec)) {{
                while((!this.Exec_Stack.isEmpty() && !this.env.bStopExec)) {{
                    TermRes = this.Exec_Stack.getTop();
                    unifiable = false;
                    package_is_known = (TermRes.pos !== 0);
                    let IdVar: string = this.variable_goal(TermRes.pTerm);
                    if (IdVar != null){
                        if (!package_is_known){
                            let valButVar: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uVariable, IdVar);
                            contr = this.env.unification.valueFromUnifStack(valButVar, TermRes.index);
                            valButVar = null;
                            if ((contr.pData == null) || ((contr.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uTerm) && (contr.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uCG))){
                                throw new PrologPlusCG.prolog.ExecException("Error: The variable goal " + IdVar + " is free or it is not a term nor a CG. ");
                            }
                            if (contr.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG){
                                const aTerm: PrologPlusCG.prolog.PrologTerm = new PrologPlusCG.prolog.PrologTerm();
                                aTerm.addData(contr.pData);
                                contr.pData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, aTerm);
                            }
                            this.env.unification.Unif_Stack.pushEmptyRecord();
                            TermRes.indexInExecStack = this.Exec_Stack.indexOfTop();
                            TermRes.pos = -1;
                            this.Return_Stack.push(this.Exec_Stack.pop());
                            TermRes = new PrologPlusCG.prolog.TermToBeResolved(<PrologPlusCG.prolog.PrologTerm>contr.pData.data, contr.index, 0);
                            this.Exec_Stack.push(TermRes);
                            IdVar = null;
                        } else {
                            TermRes.pos = 0;
                        }
                    }
                    if (IdVar == null){
                        let IdPred: string = null;
                        if (TermRes.pTerm.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier){
                            IdPred = <string>TermRes.pTerm.getAt(0).data;
                        }
                        if ((IdPred != null) && this.identifierIsPredefinedGoal(IdPred)){
                            if (!package_is_known){
                                unifiable = this.satisfyPredicateGoal(TermRes, IdPred);
                            } else {
                                unifiable = this.resatisfyPredicateGoal(TermRes, IdPred);
                            }
                        } else {
                            this.pRules = null;
                            try {
                                if (!package_is_known && (TermRes.pos > -1)){
                                    TermRes.Cle = this.env.compile.nameOfArgument(TermRes.pTerm, TermRes.index);
                                    if (/* containsKey */this.env.program.hasOwnProperty(TermRes.Cle)){
                                        this.pRules = <PrologPlusCG.prolog.RuleVector>/* get */((m,k) => m[k]===undefined?null:m[k])(this.env.program, TermRes.Cle);
                                    } else {
                                        TermRes.pos = -2;
                                    }
                                } else if (TermRes.pos > -1){
                                    this.pRules = <PrologPlusCG.prolog.RuleVector>/* get */((m,k) => m[k]===undefined?null:m[k])(this.env.program, TermRes.Cle);
                                }
                            } catch(ex) {
                                if (this.env.program == null){
                                    this.env.io.showMessageDialog("No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, \n retract and suppress) can be satisfied.", "Warning");
                                    TermRes.pos = -1;
                                    this.Return_Stack.makeEmpty();
                                }
                                const strMessage: string = "Null pointer exception: " + ex.message;
                                this.env.recordErrorMessage(strMessage);
                            }
                            IdPred = null;
                            unifiable = this.isUnifiable(TermRes);
                            if (!unifiable && (TermRes.pos !== -1) && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(TermRes.Cle, this.env.compile.valSysCleBtCp) && (TermRes.Cle.length !== this.env.compile.valSysCleBtCp.length)){
                                const ClePaquet: string = this.env.compile.valSysGEN + TermRes.Cle.substring(this.env.compile.valSysCleBtCp.length);
                                if (/* containsKey */this.env.program.hasOwnProperty(ClePaquet)){
                                    const regles: PrologPlusCG.prolog.RuleVector = <PrologPlusCG.prolog.RuleVector>/* get */((m,k) => m[k]===undefined?null:m[k])(this.env.program, ClePaquet);
                                    this.env.unification.Unif_Stack.pushEmptyRecord();
                                    const TopOfUnification_Stack: number = this.env.unification.Unif_Stack.indexOfTop();
                                    const DonCple1: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, TermRes.pTerm);
                                    const DonCple2: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, regles.getAt(0).getAt(0));
                                    unifiable = this.env.unification.unify(DonCple2, TopOfUnification_Stack, DonCple1, TermRes.index);
                                    if (unifiable){
                                        TermRes.indexInExecStack = this.Exec_Stack.indexOfTop();
                                        TermRes.pos = -1;
                                        this.Return_Stack.push(this.Exec_Stack.pop());
                                        this.Exec_Stack.push(new PrologPlusCG.prolog.TermToBeResolved(regles.getAt(0).getAt(1), TopOfUnification_Stack, 0));
                                    } else {
                                        this.env.unification.Unif_Stack.pop();
                                        TermRes.pos = 0;
                                    }
                                } else {
                                    TermRes.pos = 0;
                                }
                            } else if (!unifiable){
                                TermRes.pos = 0;
                            }
                        }
                    }
                    if (!unifiable && this.theGoalBelowOnTheStackIsNot()){
                        this.Exec_Stack.pop();
                        const unTermRes: PrologPlusCG.prolog.TermToBeResolved = this.Exec_Stack.getTop();
                        unTermRes.pos = -2;
                        unTermRes.indexInExecStack = -1;
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        this.Return_Stack.push(this.Exec_Stack.pop());
                        unifiable = true;
                    }
                    if (!unifiable && this.Return_Stack.isEmpty()){
                        this.Exec_Stack.makeEmpty();
                        this.env.unification.Unif_Stack.makeEmpty();
                        if (!solvable){
                            if (this.bResolveWithInterface){
                                this.env.io.appendToConsole(" no.\n");
                            } else {
                                this.env.vctResult = null;
                            }
                        }
                        /* clear */(this.env.compile.vctVariableIdentifiersInQuery.length = 0);
                        finished = true;
                    } else if (!unifiable){
                        this.backTrack();
                    }
                }};
                if (!this.Return_Stack.isEmpty() && !this.env.bStopExec){
                    solvable = true;
                    this.env.printer.writeOrRecordResult(!this.env.bIsApplet);
                    this.backTrack();
                    if (!this.Exec_Stack.isEmpty()){
                        TermRes = this.Exec_Stack.getTop();
                    }
                } else {
                    finished = true;
                }
            }};
            this.env.unification.Unif_Stack.makeEmpty();
            if (this.env.bStopExec){
                this.Exec_Stack.makeEmpty();
                this.Return_Stack.makeEmpty();
                this.env.bStopExec = false;
            }
            if (this.programModified){
                this.env.bWriteToDebugTree = true;
                this.env.printer.alternatePrintString = "";
                this.env.printer.printPrologProgram();
                this.env.io.setProgramText(this.env.printer.alternatePrintString);
                this.env.printer.alternatePrintString = "";
                this.env.bWriteToDebugTree = false;
            }
        }

        isUnifiable(TermRes: PrologPlusCG.prolog.TermToBeResolved): boolean {
            let unifiable: boolean = false;
            let taillePaq: number = -3;
            let Donnee1: PrologPlusCG.prolog.PrologData = null;
            if (TermRes.pos > -1){
                taillePaq = this.pRules.size();
                Donnee1 = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, TermRes.pTerm);
            }
            let pRegleLocal: PrologPlusCG.prolog.PrologRule;
            while(((TermRes.pos < taillePaq) && (!unifiable))) {{
                pRegleLocal = this.pRules.getAt(TermRes.pos);
                TermRes.pos++;
                this.env.unification.Unif_Stack.pushEmptyRecord();
                const TopOfUnification_Stack: number = this.env.unification.Unif_Stack.indexOfTop();
                let Donnee2: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, pRegleLocal.getAt(0));
                unifiable = this.env.unification.unify(Donnee2, TopOfUnification_Stack, Donnee1, TermRes.index);
                Donnee2 = null;
                if (unifiable){
                    TermRes.indexInExecStack = this.Exec_Stack.indexOfTop();
                    this.Return_Stack.push(this.Exec_Stack.pop());
                    this.push_tail(pRegleLocal, 1, TopOfUnification_Stack, this.Return_Stack.indexOfTop());
                } else {
                    this.env.unification.Unif_Stack.pop();
                }
            }};
            pRegleLocal = null;
            Donnee1 = null;
            return unifiable;
        }

        public backTrack() {
            let TermRes: PrologPlusCG.prolog.TermToBeResolved = this.Return_Stack.getTop();
            let idPred: string = null;
            if (TermRes.pTerm.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier){
                idPred = <string>TermRes.pTerm.getAt(0).data;
            }
            if ((idPred != null) && (idPred === ("/"))){
                for(let i: number = this.Return_Stack.indexOfTop(); ((i > TermRes.index) && (i >= 0)); i--) {{
                    this.Return_Stack.pop();
                    this.env.unification.Unif_Stack.pop();
                };}
                if (TermRes.index !== -1){
                    TermRes = this.Return_Stack.getTop();
                    while((this.Exec_Stack.indexOfTop() >= TermRes.indexInExecStack)) {this.Exec_Stack.pop()};
                    TermRes.pos = -1;
                    this.Exec_Stack.push(this.Return_Stack.pop());
                    this.env.unification.Unif_Stack.pop();
                } else {
                    this.Exec_Stack.makeEmpty();
                }
            } else {
                if (TermRes.indexInExecStack >= 0){
                    while((this.Exec_Stack.indexOfTop() >= TermRes.indexInExecStack)) {{
                        this.Exec_Stack.pop();
                    }};
                }
                this.Exec_Stack.push(this.Return_Stack.pop());
                this.env.unification.Unif_Stack.pop();
            }
            idPred = null;
            TermRes = null;
        }

        public push_tail(pRegleLocal: PrologPlusCG.prolog.PrologRule, LimitIndex: number, Niv: number, TopOfReturnStack: number) {
            for(let i: number = (pRegleLocal.size() - 1); i >= LimitIndex; i--) {{
                if ((pRegleLocal.getAt(i).getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) && ((<string>pRegleLocal.getAt(i).getAt(0).data) === ("/"))){
                    this.Exec_Stack.push(new PrologPlusCG.prolog.TermToBeResolved(pRegleLocal.getAt(i), TopOfReturnStack, 0));
                } else {
                    this.Exec_Stack.push(new PrologPlusCG.prolog.TermToBeResolved(pRegleLocal.getAt(i), Niv, 0));
                }
            };}
        }

        public variable_goal(pTerme: PrologPlusCG.prolog.PrologTerm): string {
            if (pTerme.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable){
                return (<string>pTerme.getAt(0).data);
            } else {
                return null;
            }
        }

        public identifierIsPredefinedGoal(IdPred: string): boolean {
            for(let i: number = 0; true; i++) {{
                if (this.PredefinedGoals[i] === IdPred){
                    return true;
                } else if (this.PredefinedGoals[i] === this.strEndOfPredefinedGoals){
                    break;
                }
            };}
            return false;
        }

        theGoalBelowOnTheStackIsNot(): boolean {
            let bFound: boolean = false;
            if (this.Exec_Stack.size() > 1){
                const unTermRes: PrologPlusCG.prolog.TermToBeResolved = <PrologPlusCG.prolog.TermToBeResolved>this.Exec_Stack.get(this.Exec_Stack.indexOfTop() - 1);
                if ((unTermRes.pTerm.getAt(0).typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) && ((<string>unTermRes.pTerm.getAt(0).data) === ("not")) && (unTermRes.pos === -1)){
                    bFound = true;
                }
            }
            return bFound;
        }

        ASSERT(cond: boolean, msg: string) {
            if (!cond){
                alert("ASSERT(false, \'" + msg + "\'");
                throw new PrologPlusCG.prolog.ExecException(msg);
            }
        }

        satisfyPredicateGoal(pTermRes: PrologPlusCG.prolog.TermToBeResolved, IdPred: string): boolean {
            let resultat: boolean = false;
            let Arg1: PrologPlusCG.prolog.PrologDataIndexPair;
            let Arg2: PrologPlusCG.prolog.PrologDataIndexPair;
            let pRules: PrologPlusCG.prolog.RuleVector;
            let pLstPrlg: PrologPlusCG.prolog.PrologList;
            let pTerme: PrologPlusCG.prolog.PrologTerm;
            if (IdPred === ("/")){
                this.env.unification.Unif_Stack.pushEmptyRecord();
                pTermRes.indexInExecStack = this.Exec_Stack.indexOfTop();
                this.Return_Stack.push(this.Exec_Stack.pop());
                resultat = true;
            } else if ((IdPred === ("maximalJoin")) || (IdPred === ("generalize")) || (IdPred === ("subsume"))){
                let G1: PrologPlusCG.cg.CG;
                let G2: PrologPlusCG.cg.CG;
                let G3: PrologPlusCG.cg.CG = null;
                let nivG1: number = 0;
                let nivG2: number = 0;
                let C1: PrologPlusCG.cg.Concept = null;
                let C2: PrologPlusCG.cg.Concept = null;
                let DonRes: PrologPlusCG.prolog.PrologData = null;
                let DonResBis: PrologPlusCG.prolog.PrologData = null;
                this.ASSERT(((pTermRes.pTerm.size() === 7) || (pTermRes.pTerm.size() === 4) || ((pTermRes.pTerm.size() === 5) && (IdPred === ("subsume"))) || ((pTermRes.pTerm.size() === 3) && (IdPred === ("subsume")))), "Error: Wrong number of arguments for the CG operation.\n");
                if ((pTermRes.pTerm.size() === 7) || (pTermRes.pTerm.size() === 5)){
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)), "Error: the first argument of the CG operation must be a CG.\n");
                    G1 = <PrologPlusCG.cg.CG>Arg1.pData.data;
                    nivG1 = Arg1.index;
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    if ((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uConcept)){
                        C1 = <PrologPlusCG.cg.Concept>Arg2.pData.data;
                    } else {
                        this.ASSERT(false, "Error: The second argument of the CG operation should be a concept.\n");
                    }
                    const Arg3: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                    this.ASSERT(((Arg3.pData != null) && (Arg3.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)), "Error: the third argument of the CG operation must be a CG.\n");
                    G2 = <PrologPlusCG.cg.CG>Arg3.pData.data;
                    nivG2 = Arg3.index;
                    const Arg4: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(4), pTermRes.index);
                    if ((Arg4.pData != null) && (Arg4.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uConcept)){
                        C2 = <PrologPlusCG.cg.Concept>Arg4.pData.data;
                    } else {
                        this.ASSERT(false, "Error: The fourth argument of the CG operation should be a concept.\n");
                    }
                    if (pTermRes.pTerm.size() === 7){
                        const Arg5: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(5), pTermRes.index);
                        this.ASSERT((Arg5.pData == null), "Error: the fifth argument of the CG operation must be a free variable.\n");
                        G3 = new PrologPlusCG.cg.CG();
                        DonRes = pTermRes.pTerm.getAt(5);
                        const Arg6: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(6), pTermRes.index);
                        this.ASSERT((Arg6.pData == null), "Error: the sixth argument of the CG operation must be a free variable.\n");
                        DonResBis = pTermRes.pTerm.getAt(6);
                    }
                } else {
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)), "Error: the first argument of the CG operation must be a CG.\n");
                    G1 = <PrologPlusCG.cg.CG>Arg1.pData.data;
                    nivG1 = Arg1.index;
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)), "Error: the second argument of the CG operation must be a CG.\n");
                    G2 = <PrologPlusCG.cg.CG>Arg2.pData.data;
                    nivG2 = Arg2.index;
                    if (pTermRes.pTerm.size() === 4){
                        const Arg3: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                        this.ASSERT((Arg3.pData == null), "Error: the third argument of the CG operation must be a free variable.\n");
                        G3 = new PrologPlusCG.cg.CG();
                        DonRes = pTermRes.pTerm.getAt(3);
                    }
                }
                let resMatchCG: PrologPlusCG.cg.CGMatchResult = new PrologPlusCG.cg.CGMatchResult(G3, null);
                let uneOperGC: PrologPlusCG.cg.CGOperation = new PrologPlusCG.cg.CGOperation(this.env);
                resultat = uneOperGC.matchCG(PrologPlusCG.cg.CGOperation.convertToByte(IdPred, G3), C1, G1, nivG1, C2, G2, nivG2, resMatchCG);
                uneOperGC.corefMatchVec_MakeEmpty();
                uneOperGC = null;
                this.env.unification.Unif_Stack.pushEmptyRecord();
                if (resultat && (DonRes != null)){
                    const donTmp: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uCG, resMatchCG.G3);
                    resultat = this.env.unification.unify(DonRes, pTermRes.index, donTmp, pTermRes.index);
                }
                if (resultat && (DonResBis != null)){
                    resultat = this.env.unification.unify(DonResBis, pTermRes.index, new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uConcept, resMatchCG.E3), pTermRes.index);
                }
                if (resultat){
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                } else {
                    if (resMatchCG.G3 != null){
                        resMatchCG.G3.myDestroy();
                    }
                    if (resMatchCG.E3 != null){
                        resMatchCG.E3 = null;
                    }
                    this.env.unification.Unif_Stack.pop();
                }
                resMatchCG = null;
            } else if (IdPred === ("length")){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: length takes two arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: The first argument of length must be a list.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData == null) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error: The second argument of length must be an integer or a free variable.\n");
                pLstPrlg = <PrologPlusCG.prolog.PrologList>Arg1.pData.data;
                let taille: number = 0;
                if (pLstPrlg != null){
                    taille = pLstPrlg.size();
                    let ValVarList: PrologPlusCG.prolog.PrologDataIndexPair = null;
                    let uneDonTmp: PrologPlusCG.prolog.PrologData = null;
                    let finished: boolean = false;
                    let Arg1Niv: number = Arg1.index;
                    while((!finished)) {{
                        try {
                            uneDonTmp = <PrologPlusCG.prolog.PrologData>pLstPrlg.lastElement();
                        } catch(nsex) {
                        }
                        if (uneDonTmp.typeOfData === PrologPlusCG.prolog.DataTypes.uVarList){
                            ValVarList = this.env.unification.valueFromUnifStack(uneDonTmp, Arg1Niv);
                            Arg1Niv = ValVarList.index;
                            if ((ValVarList.pData != null) && (ValVarList.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uList)){
                                throw new PrologPlusCG.prolog.ExecException("The value of the variable after | should be a list.\n");
                            } else if (ValVarList.pData != null){
                                pLstPrlg = <PrologPlusCG.prolog.PrologList>ValVarList.pData.data;
                                taille--;
                                if (pLstPrlg == null){
                                    finished = true;
                                } else {
                                    taille = taille + pLstPrlg.size();
                                }
                            } else {
                                throw new PrologPlusCG.prolog.ExecException("Warning : The length of the list can not be determined since it is partially specified; the variable after | is free.\n");
                            }
                        } else {
                            finished = true;
                        }
                    }};
                }
                this.env.unification.Unif_Stack.pushEmptyRecord();
                resultat = this.env.unification.unify(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uNumber, new Number(taille).valueOf()), pTermRes.index, pTermRes.pTerm.getAt(2), pTermRes.index);
                if (resultat){
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                } else {
                    this.env.unification.Unif_Stack.pop();
                }
            } else if ((IdPred === ("stringToLetters")) || (IdPred === ("identToLetters"))){
                let typeMot: number = 0;
                if (IdPred === ("stringToLetters")){
                    typeMot = PrologPlusCG.prolog.DataTypes.uString;
                } else {
                    typeMot = PrologPlusCG.prolog.DataTypes.uIdentifier;
                }
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: " + IdPred + " takes two arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData == null) || (Arg1.pData.typeOfData === typeMot)), "Error: The first argument of " + IdPred + " must be a string/ident or a free variable.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData == null) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: The second argument of " + IdPred + " must be a list or a free variable.\n");
                this.ASSERT(((Arg1.pData != null) || (Arg2.pData != null)), "Error: At least one of the two arguments of " + IdPred + " must be bound.\n");
                if (Arg1.pData != null){
                    const mot: string = <string>Arg1.pData.data;
                    let tailleMot: number = mot.length;
                    let i: number = 0;
                    if (IdPred === ("stringToLetters")){
                        i++;
                        tailleMot--;
                    }
                    let carToString: string = null;
                    pLstPrlg = new PrologPlusCG.prolog.PrologList();
                    let uneDon: PrologPlusCG.prolog.PrologData;
                    for(; i < tailleMot; i++) {{
                        carToString = "\"" + /* valueOf */String(mot.charAt(i)).toString() + "\"";
                        uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uString, carToString);
                        pLstPrlg.addData(uneDon);
                    };}
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, pLstPrlg);
                    resultat = this.env.unification.unify(uneDon, pTermRes.index, pTermRes.pTerm.getAt(2), pTermRes.index);
                } else {
                    pLstPrlg = <PrologPlusCG.prolog.PrologList>Arg2.pData.data;
                    pLstPrlg = this.copyAllOfTheListWithUnification(pLstPrlg, Arg2.index);
                    let tailleVect: number = pLstPrlg.size();
                    let i: number = 0;
                    let vectCars: string[] = null;
                    if (IdPred === ("stringToLetters")){
                        tailleVect = tailleVect + 2;
                        vectCars = (s => { let a=[]; while(s-->0) a.push(null); return a; })(tailleVect);
                        vectCars[0] = '\"';
                        vectCars[tailleVect - 1] = '\"';
                        i = 1;
                    } else {
                        vectCars = (s => { let a=[]; while(s-->0) a.push(null); return a; })(tailleVect);
                    }
                    let uneDon: PrologPlusCG.prolog.PrologData;
                    let s: string = null;
                    for(let listIndex: number = 0; listIndex < pLstPrlg.size(); listIndex++, i++) {{
                        uneDon = <PrologPlusCG.prolog.PrologData>pLstPrlg.get(listIndex);
                        s = <string>uneDon.data;
                        vectCars[i] = s.charAt(1);
                    };}
                    const mot: string = vectCars.join('');
                    uneDon = new PrologPlusCG.prolog.PrologData(typeMot, mot);
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, uneDon, pTermRes.index);
                }
                if (resultat){
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                } else {
                    this.env.unification.Unif_Stack.pop();
                }
            } else if (IdPred === ("concat")){
                this.ASSERT((pTermRes.pTerm.size() === 4), "Error: " + IdPred + " takes three arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData == null) || (this.typeIsPrimitive(Arg1.pData.typeOfData))), "Error: The first argument of " + IdPred + " must be a number, a boolean, an identifier, a string, or a free variable.\n");
                let nNoOfFreeArguments: number = 0;
                if (Arg1.pData == null){
                    nNoOfFreeArguments++;
                }
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData == null) || (this.typeIsPrimitive(Arg2.pData.typeOfData))), "Error: The second argument of " + IdPred + " must be a number, a boolean, an identifier, a string, or a free variable.\n");
                if (Arg2.pData == null){
                    nNoOfFreeArguments++;
                }
                const Arg3: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                this.ASSERT(((Arg3.pData == null) || (Arg3.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString)), "Error: The third argument of " + IdPred + " must be a string or a free variable.\n");
                if (Arg3.pData == null){
                    nNoOfFreeArguments++;
                }
                this.ASSERT((nNoOfFreeArguments === 1) || (nNoOfFreeArguments === 0), "Error: " + IdPred + " must have either two or three bound arguments.\n");
                if (Arg3.pData == null || nNoOfFreeArguments === 0){
                    const s1: string = this.primitiveTypeToString(Arg1.pData);
                    const s2: string = this.primitiveTypeToString(Arg2.pData);
                    const s3: string = "\"" + s1.substring(1, s1.length - 1) + s2.substring(1, s2.length - 1) + "\"";
                    const uneDon: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uString, s3);
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    resultat = this.env.unification.unify(uneDon, pTermRes.index, pTermRes.pTerm.getAt(3), pTermRes.index);
                } else if (Arg2.pData == null){
                    const s1: string = this.primitiveTypeToString(Arg1.pData);
                    const s3: string = this.primitiveTypeToString(Arg3.pData);
                    const s1stripped: string = s1.substring(1, s1.length - 1);
                    const s3stripped: string = s3.substring(1, s3.length - 1);
                    resultat = /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(s3stripped, s1stripped);
                    if (!resultat){
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                    } else {
                        const s1strippedLength: number = s1stripped.length;
                        const s2: string = "\"" + s3stripped.substring(s1strippedLength, s3stripped.length) + "\"";
                        const uneDon: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uString, s2);
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        resultat = this.env.unification.unify(uneDon, pTermRes.index, pTermRes.pTerm.getAt(2), pTermRes.index);
                    }
                } else {
                    const s2: string = this.primitiveTypeToString(Arg2.pData);
                    const s3: string = this.primitiveTypeToString(Arg3.pData);
                    const s2stripped: string = s2.substring(1, s2.length - 1);
                    const s3stripped: string = s3.substring(1, s3.length - 1);
                    resultat = /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(s3stripped, s2stripped);
                    if (!resultat){
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                    } else {
                        const s2strippedLength: number = s2stripped.length;
                        const s1: string = "\"" + s3stripped.substring(0, s3stripped.length - s2strippedLength) + "\"";
                        const uneDon: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uString, s1);
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        resultat = this.env.unification.unify(uneDon, pTermRes.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                    }
                }
                if (resultat){
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                } else {
                    this.env.unification.Unif_Stack.pop();
                }
            } else if (IdPred === ("external")){
                resultat = true;
                this.ASSERT((pTermRes.pTerm.size() === 4), "Error: " + IdPred + " takes three arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(Arg1.pData != null && Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString, "Error: The first argument of " + IdPred + " must be a string.\n");
                let nNoOfFreeArguments: number = 0;
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: The second argument of " + IdPred + " must be a list.\n");
                const Arg3: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                this.ASSERT(((Arg3.pData == null) || (Arg3.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString)), "Error: The third argument of " + IdPred + " must be a string or a free variable.\n");
                if (Arg3.pData == null){
                    nNoOfFreeArguments++;
                }
                this.ASSERT((nNoOfFreeArguments === 1) || (nNoOfFreeArguments === 0), "Error: " + IdPred + " must have either two or three bound arguments.\n");
                let functionName: string = Arg1.pData.valString();
                if (functionName.length > 2){
                    functionName = functionName.substring(1, functionName.length - 1);
                }
                const myFunc: Function = <any>(window[functionName]);
                const params: Array<any> = <any>([]);
                let pLstPrlg1: PrologPlusCG.prolog.PrologList = <PrologPlusCG.prolog.PrologList>Arg2.pData.data;
                pLstPrlg1 = this.copyAllOfTheListWithUnification(pLstPrlg1, Arg2.index);
                for(let listIndex: number = 0; listIndex < pLstPrlg1.size(); ++listIndex) {{
                    const obj: any = pLstPrlg1.get(listIndex).data;
                    /* add */(params.push(obj)>0);
                };}
                let result: any = null;
                try {
                    result = myFunc.apply(window, params);
                } catch(e) {
                    const strMessage: string = "Could not call function: " + functionName + "\nException = " + e.message;
                    this.env.recordErrorMessage(strMessage);
                    console.log("UP210.6.5: " + strMessage);
                    resultat = false;
                }
                if (resultat){
                    let uneDon: PrologPlusCG.prolog.PrologData = null;
                    if (typeof result === 'string'){
                        uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uString, result);
                    } else if (typeof result === 'number'){
                        uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uNumber, result);
                    } else if (typeof result === 'number'){
                        uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uNumber, result);
                    } else {
                        uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uString, result.toString());
                    }
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    resultat = this.env.unification.unify(uneDon, pTermRes.index, pTermRes.pTerm.getAt(3), pTermRes.index);
                }
                if (resultat){
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                } else {
                    this.env.unification.Unif_Stack.pop();
                }
            } else if (IdPred === ("branchOfCG")){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: branchOfCG takes two arguments.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)), "Error: The second argument of branchOfCG must be a CG.\n");
                const unGC: PrologPlusCG.cg.CG = <PrologPlusCG.cg.CG>Arg2.pData.data;
                const vctRels: Array<PrologPlusCG.cg.Relation> = unGC.m_vctRelations;
                const nbreBranch: number = /* size */(<number>vctRels.length);
                while(((pTermRes.pos < nbreBranch) && !resultat)) {{
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    const unGCBranch: PrologPlusCG.cg.CG = this.createCGBranch(<PrologPlusCG.cg.Relation>/* elementAt */vctRels[pTermRes.pos]);
                    resultat = this.env.unification.unify(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uCG, unGCBranch), Arg2.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                    pTermRes.pos++;
                    if (resultat){
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    } else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }};
            } else if (IdPred === ("concOfCG")){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: concOfCG takes two arguments.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)), "Error: The second argument of concOfCG must be a CG.\n");
                const unGC: PrologPlusCG.cg.CG = <PrologPlusCG.cg.CG>Arg2.pData.data;
                const vctConcepts: Array<PrologPlusCG.cg.Concept> = unGC.m_vctConcepts;
                const nbreConcs: number = /* size */(<number>vctConcepts.length);
                resultat = false;
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                while(((pTermRes.pos < nbreConcs) && !resultat)) {{
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    const concCour: PrologPlusCG.cg.Concept = <PrologPlusCG.cg.Concept>/* elementAt */vctConcepts[pTermRes.pos];
                    if (Arg1.pData == null){
                        resultat = this.env.unification.unify(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uConcept, concCour), Arg2.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                    } else {
                        const gTmp: PrologPlusCG.cg.CG = new PrologPlusCG.cg.CG();
                        gTmp.addConcept(concCour);
                        resultat = this.env.unification.unify(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uCG, gTmp), Arg2.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                    }
                    pTermRes.pos++;
                    if (resultat){
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    } else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }};
            } else if (IdPred === ("member")){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: member takes two arguments.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: The second argument of member must be a list.\n");
                pLstPrlg = <PrologPlusCG.prolog.PrologList>Arg2.pData.data;
                pTermRes.lstMember = null;
                pTermRes.indLstMember = 0;
                let Arg2Niv: number = Arg2.index;
                let dernierInd: number = pLstPrlg.size() - 1;
                let finished: boolean = false;
                while((!finished && !resultat)) {{
                    while(((pTermRes.pos < dernierInd) && !resultat)) {{
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, pLstPrlg.getAt(pTermRes.pos), Arg2Niv);
                        pTermRes.pos++;
                        if (resultat){
                            this.Return_Stack.push(this.Exec_Stack.pop());
                        } else {
                            this.env.unification.Unif_Stack.pop();
                        }
                    }};
                    if (!resultat && (pTermRes.pos === dernierInd)){
                        if (pLstPrlg.getAt(dernierInd).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList){
                            const contr: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pLstPrlg.getAt(dernierInd), Arg2Niv);
                            this.ASSERT((contr.pData != null) && (contr.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList), "Error: The second argument of member should be a list.\n");
                            pLstPrlg = <PrologPlusCG.prolog.PrologList>contr.pData.data;
                            Arg2Niv = contr.index;
                            pTermRes.lstMember = pLstPrlg;
                            pTermRes.indLstMember = contr.index;
                            dernierInd = pLstPrlg.size() - 1;
                            pTermRes.pos = 0;
                        } else {
                            this.env.unification.Unif_Stack.pushEmptyRecord();
                            resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, pLstPrlg.getAt(dernierInd), Arg2Niv);
                            pTermRes.pos++;
                            if (resultat){
                                this.Return_Stack.push(this.Exec_Stack.pop());
                            } else {
                                this.env.unification.Unif_Stack.pop();
                            }
                            finished = true;
                        }
                    } else {
                        finished = true;
                    }
                }};
                if (!resultat){
                    pTermRes.lstMember = null;
                    pTermRes.indLstMember = 0;
                    pTermRes.pos = 0;
                }
            } else if (IdPred === ("not")){
                this.ASSERT((pTermRes.pTerm.size() === 2), "Error: not takes one argument.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData != null) && ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG))), "Error: The not argument must be a term or a CG.\n");
                pTermRes.pos = -1;
                pTermRes.indexInExecStack = this.Return_Stack.indexOfTop();
                let aTrmtmp: PrologPlusCG.prolog.PrologTerm = null;
                if ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)){
                    aTrmtmp = new PrologPlusCG.prolog.PrologTerm();
                    aTrmtmp.addData(Arg1.pData);
                } else {
                    aTrmtmp = <PrologPlusCG.prolog.PrologTerm>Arg1.pData.data;
                }
                this.Exec_Stack.push(new PrologPlusCG.prolog.TermToBeResolved(aTrmtmp, Arg1.index, 0));
                resultat = true;
            } else if (IdPred === ("findall")){
                this.ASSERT((pTermRes.pTerm.size() === 4), "Error: findall takes three arguments.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData != null) && ((Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG))), "Error: The second argument of findall must be a term or a CG.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData == null) && ((pTermRes.pTerm.getAt(1).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (pTermRes.pTerm.getAt(1).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList)) && this.isVariableGoal(<string>pTermRes.pTerm.getAt(1).data, Arg2.pData)), "Error: The first argument of findall must be a free variable that is contained in the second argument.\n");
                const Arg3: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                this.ASSERT((Arg3.pData == null) && ((pTermRes.pTerm.getAt(3).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (pTermRes.pTerm.getAt(3).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList)), "Error: the third argument of findall must be a free variable.\n");
                pTermRes.pos = -1;
                this.env.unification.Unif_Stack.pushEmptyRecord();
                pLstPrlg = new PrologPlusCG.prolog.PrologList();
                let nouvDon: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, pLstPrlg);
                this.env.unification.unify(pTermRes.pTerm.getAt(3), pTermRes.index, nouvDon, pTermRes.index);
                pTermRes.lstMember = pLstPrlg;
                this.Return_Stack.push(this.Exec_Stack.pop());
                let aTrmTmp: PrologPlusCG.prolog.PrologTerm = new PrologPlusCG.prolog.PrologTerm();
                nouvDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, "fail");
                aTrmTmp.addData(nouvDon);
                nouvDon = null;
                this.Exec_Stack.push(new PrologPlusCG.prolog.TermToBeResolved(aTrmTmp, pTermRes.index, 0));
                aTrmTmp = new PrologPlusCG.prolog.PrologTerm();
                aTrmTmp.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, "addElemForAll"));
                aTrmTmp.addData(pTermRes.pTerm.getAt(1));
                aTrmTmp.addData(pTermRes.pTerm.getAt(3));
                this.Exec_Stack.push(new PrologPlusCG.prolog.TermToBeResolved(aTrmTmp, pTermRes.index, 0));
                if (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG){
                    aTrmTmp = new PrologPlusCG.prolog.PrologTerm();
                    aTrmTmp.addData(Arg2.pData);
                } else {
                    aTrmTmp = <PrologPlusCG.prolog.PrologTerm>Arg2.pData.data;
                }
                this.Exec_Stack.push(new PrologPlusCG.prolog.TermToBeResolved(aTrmTmp, Arg2.index, 0));
                aTrmTmp = null;
                resultat = true;
            } else if (IdPred === ("set_list")){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: set_list takes two arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData == null) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uSet)), "Error: the first argument of set_list must be a free variable or a set.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData == null) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: the second argument of set_list must be a free variable or a list.\n");
                this.ASSERT(((Arg1.pData != null) || (Arg2.pData != null)), "Error: the two arguments of set_list can not be two free variables.\n");
                if (Arg1.pData == null){
                    pLstPrlg = <PrologPlusCG.prolog.PrologList>Arg2.pData.data;
                    pLstPrlg = this.copyAllOfTheListWithUnification(pLstPrlg, Arg2.index);
                    const uneDon: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uSet, pLstPrlg);
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, uneDon, pTermRes.index);
                } else {
                    const uneDon: PrologPlusCG.prolog.PrologData = Arg1.pData.myCopy();
                    uneDon.typeOfData = PrologPlusCG.prolog.DataTypes.uList;
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    resultat = this.env.unification.unify(uneDon, pTermRes.index, pTermRes.pTerm.getAt(2), pTermRes.index);
                }
                if (resultat){
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                } else {
                    this.env.unification.Unif_Stack.pop();
                }
            } else if (IdPred === ("shuffle")){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: shuffle takes two arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList), "Error: the first argument of shuffle must be a list.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT((Arg2.pData == null), "Error: the second argument of shuffle must be a free variable.\n");
                pLstPrlg = <PrologPlusCG.prolog.PrologList>Arg1.pData.data;
                pLstPrlg = this.copyAllOfTheListWithUnification(pLstPrlg, Arg1.index);
                pLstPrlg.shuffle$();
                const uneDon: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, pLstPrlg);
                this.env.unification.Unif_Stack.pushEmptyRecord();
                resultat = this.env.unification.unify(pTermRes.pTerm.getAt(2), pTermRes.index, uneDon, pTermRes.index);
                if (resultat){
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                } else {
                    this.env.unification.Unif_Stack.pop();
                }
            } else if (IdPred === ("term_list")){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: term_list takes two arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData == null) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm)), "Error: the first argument of term_list must be a free variable or a term.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData == null) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: the second argument of term_list must be a free variable or a list.\n");
                this.ASSERT(((Arg1.pData != null) || (Arg2.pData != null)), "Error: the two arguments of term_list can not be two free variables.\n");
                if (Arg1.pData == null){
                    pLstPrlg = <PrologPlusCG.prolog.PrologList>Arg2.pData.data;
                    this.ASSERT((pLstPrlg.size() !== 0), "Error: the second argument of term_list can not be an empty list.\n");
                    let ArgTmp: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(<PrologPlusCG.prolog.PrologData>pLstPrlg.elementAt(0), Arg2.index);
                    this.ASSERT(((ArgTmp.pData != null) && (ArgTmp.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error: the first element of the list (the second argument of term_list) must be an identifier.\n");
                    pTerme = new PrologPlusCG.prolog.PrologTerm();
                    let uneDon: PrologPlusCG.prolog.PrologData;
                    for(let listIndex: number = 0; listIndex < pLstPrlg.size(); ++listIndex) {{
                        uneDon = <PrologPlusCG.prolog.PrologData>pLstPrlg.get(listIndex);
                        pTerme.addData(uneDon);
                    };}
                    pTerme.set(0, ArgTmp.pData);
                    ArgTmp = null;
                    uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, pTerme);
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, uneDon, pTermRes.index);
                } else {
                    pTerme = <PrologPlusCG.prolog.PrologTerm>Arg1.pData.data;
                    pLstPrlg = new PrologPlusCG.prolog.PrologList();
                    let uneDon: PrologPlusCG.prolog.PrologData = null;
                    for(let listIndex: number = 0; listIndex < pTerme.size(); ++listIndex) {{
                        uneDon = <PrologPlusCG.prolog.PrologData>pTerme.get(listIndex);
                        pLstPrlg.addData(uneDon);
                    };}
                    uneDon = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, pLstPrlg);
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    resultat = this.env.unification.unify(uneDon, pTermRes.index, pTermRes.pTerm.getAt(2), pTermRes.index);
                }
                if (resultat){
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                } else {
                    this.env.unification.Unif_Stack.pop();
                }
            } else if ((IdPred === ("read")) || (IdPred === ("read_sentence"))){
                this.ASSERT(!this.env.bIsApplet, "Cannot use the \'read\' or \'read_sentence\' predicates in an applet!");
                if (IdPred === ("read")){
                    this.ASSERT((pTermRes.pTerm.size() === 2), "Error: read takes one argument.\n");
                } else {
                    this.ASSERT(((pTermRes.pTerm.size() === 2) || (pTermRes.pTerm.size() === 3)), "Error: read_sentence takes one or two arguments.\n");
                }
                let modeLecture: number = 0;
                if (pTermRes.pTerm.size() === 2){
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData == null) && ((pTermRes.pTerm.getAt(1).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (pTermRes.pTerm.getAt(1).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList))), "Error: the read and read_sentence/1 argument must be a free variable.\n");
                    if (IdPred === ("read")){
                        modeLecture = PrologPlusCG.prolog.DataTypes.uReadData;
                    } else {
                        modeLecture = PrologPlusCG.prolog.DataTypes.uReadSentence;
                    }
                    this.env.io.appendToConsole("|: ");
                    this.env.io.readSomething(modeLecture);
                } else {
                    modeLecture = PrologPlusCG.prolog.DataTypes.uReadSentence;
                    Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                    this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString)), "Error: The first argument of read_sentence/2 must be a String.\n");
                    Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                    this.ASSERT(((Arg2.pData == null) && ((pTermRes.pTerm.getAt(2).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (pTermRes.pTerm.getAt(2).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList))), "Error: The second argument of read_sentence/2 must be a free variable.\n");
                    try {
                        const sTmp: string = <string>Arg1.pData.data;
                        this.env.compile.CompileTxt = sTmp.substring(1, sTmp.length - 1);
                        this.env.compile.textEndIndex = this.env.compile.CompileTxt.length;
                        this.env.compile.curCharIndex = 0;
                        this.env.compile.readChar();
                        /* clear */(this.env.compile.vctUnitTyp.length = 0);
                        this.env.compile.tSentence();
                    } catch(e1) {
                        if (!(e1.message === ("End Of Text")) || /* isEmpty */(this.env.compile.vctUnitTyp.length == 0)){
                            this.env.io.appendToConsole("\n Error in the given string.");
                            /* clear */(this.env.compile.vctUnitTyp.length = 0);
                        }
                    }
                }
                if (!/* isEmpty */(this.env.compile.vctUnitTyp.length == 0) && (modeLecture === PrologPlusCG.prolog.DataTypes.uReadData)){
                    let trmTmp: PrologPlusCG.prolog.PrologTerm = new PrologPlusCG.prolog.PrologTerm();
                    try {
                        this.env.compile.currElem = 0;
                        this.env.compile.tPrologData(true, trmTmp);
                    } catch(ce) {
                    }
                    const donIn: PrologPlusCG.prolog.PrologData = trmTmp.getAt(0);
                    trmTmp.clear();
                    trmTmp = null;
                    /* clear */(this.env.compile.vctUnitTyp.length = 0);
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    resultat = this.env.unification.unify(donIn, pTermRes.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                    if (resultat){
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    } else {
                        this.env.unification.Unif_Stack.pop();
                    }
                } else if (!/* isEmpty */(this.env.compile.vctUnitTyp.length == 0) && (modeLecture === PrologPlusCG.prolog.DataTypes.uReadSentence)){
                    const LstPrlg: PrologPlusCG.prolog.PrologList = new PrologPlusCG.prolog.PrologList();
                    let unitTyp: PrologPlusCG.prolog.UnitType = null;
                    let sTmp: string = null;
                    for(let listIndex: number = 0; listIndex < /* size */(<number>this.env.compile.vctUnitTyp.length); ++listIndex) {{
                        unitTyp = /* get */this.env.compile.vctUnitTyp[listIndex];
                        sTmp = '\"' + /* toString */unitTyp.unit.str + '\"';
                        LstPrlg.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uString, sTmp));
                    };}
                    /* clear */(this.env.compile.vctUnitTyp.length = 0);
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    let donTmp: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, LstPrlg);
                    let indArg: number = 0;
                    if (pTermRes.pTerm.size() === 2){
                        indArg = 1;
                    } else {
                        indArg = 2;
                    }
                    resultat = this.env.unification.unify(donTmp, pTermRes.index, pTermRes.pTerm.getAt(indArg), pTermRes.index);
                    donTmp = null;
                    if (resultat){
                        pTermRes.pos = -1;
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    } else {
                        this.env.unification.Unif_Stack.pop();
                    }
                } else {
                    throw new PrologPlusCG.prolog.ExecException("Error while reading data.");
                }
            } else if (IdPred === ("addElemForAll")){
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                pLstPrlg = <PrologPlusCG.prolog.PrologList>Arg2.pData.data;
                if ((pLstPrlg.size() === 0) || (Arg1.pData !== (<PrologPlusCG.prolog.PrologData>pLstPrlg.lastElement()))){
                    pLstPrlg.addData(Arg1.pData);
                }
                this.env.unification.Unif_Stack.pushEmptyRecord();
                pTermRes.pos = -1;
                this.Return_Stack.push(this.Exec_Stack.pop());
                resultat = true;
            } else if (IdPred === ("write")){
                this.ASSERT((pTermRes.pTerm.size() === 2), "Error: write takes one argument.\n");
                this.env.printer.indVar = 0;
                this.env.printer.printPrologData(pTermRes.pTerm.getAt(1), pTermRes.index, true);
                this.env.printer.flush();
                this.env.unification.Unif_Stack.pushEmptyRecord();
                pTermRes.pos = -1;
                this.Return_Stack.push(this.Exec_Stack.pop());
                resultat = true;
            } else if (IdPred === ("writenl")){
                this.ASSERT((pTermRes.pTerm.size() === 2), "Error: writenl takes one argument.\n");
                this.env.printer.indVar = 0;
                this.env.printer.printPrologData(pTermRes.pTerm.getAt(1), pTermRes.index, true);
                this.env.printer.flush();
                this.env.io.appendToConsole("\n");
                this.env.unification.Unif_Stack.pushEmptyRecord();
                pTermRes.pos = -1;
                this.Return_Stack.push(this.Exec_Stack.pop());
                resultat = true;
            } else if (IdPred === ("clearConsole")){
                this.ASSERT((pTermRes.pTerm.size() === 1), "Error: clearConsole takes no arguments.\n");
                this.env.io.clearConsole();
                this.env.unification.Unif_Stack.pushEmptyRecord();
                pTermRes.pos = -1;
                this.Return_Stack.push(this.Exec_Stack.pop());
                resultat = true;
            } else if (IdPred === ("nl")){
                this.ASSERT((pTermRes.pTerm.size() === 1), "Error: nl takes no arguments.\n");
                this.env.io.appendToConsole("\n");
                this.env.unification.Unif_Stack.pushEmptyRecord();
                pTermRes.pos = -1;
                this.Return_Stack.push(this.Exec_Stack.pop());
                resultat = true;
            } else if (IdPred === ("destroyAll")){
                this.ASSERT((pTermRes.pTerm.size() === 1), "Error: destroyAll has no argument.\n");
                this.clear_globalPrlgPCGObjs();
                this.env.unification.Unif_Stack.pushEmptyRecord();
                pTermRes.pos = -1;
                this.Return_Stack.push(this.Exec_Stack.pop());
                resultat = true;
            } else if (IdPred === ("destroy")){
                this.ASSERT((pTermRes.pTerm.size() === 2), "Error: destroy takes one argument.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error: the first argument of destroy must be an identifier.\n");
                const IdObj: string = <string>Arg1.pData.data;
                this.ASSERT((/* get */((m,k) => m[k]===undefined?null:m[k])(this.globalPrlgPCGObjs, IdObj) != null), "Error : Object unknown.");
                /* remove */(map => { let deleted = this.globalPrlgPCGObjs[IdObj];delete this.globalPrlgPCGObjs[IdObj];return deleted;})(this.globalPrlgPCGObjs);
                this.env.unification.Unif_Stack.pushEmptyRecord();
                pTermRes.pos = -1;
                this.Return_Stack.push(this.Exec_Stack.pop());
                resultat = true;
            } else if (IdPred === ("objectify")){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: objectify takes two arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uObject)), "Error: the first argument of objectify must be an object.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error: the second argument of objectify must be an identifier.\n");
                const IdObj: string = <string>Arg2.pData.data;
                this.ASSERT((/* get */((m,k) => m[k]===undefined?null:m[k])(this.globalPrlgPCGObjs, IdObj) == null), "Error : Object already exists.");
                /* put */(this.globalPrlgPCGObjs[IdObj] = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uObject, Arg1.pData.data));
                this.env.unification.Unif_Stack.pushEmptyRecord();
                pTermRes.pos = -1;
                this.Return_Stack.push(this.Exec_Stack.pop());
                resultat = true;
            } else if (IdPred === ("createInstance")){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: createInstance takes two arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData != null) && ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString))), "Error: the first argument of createInstance must be an identifier.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm)), "Error: the second argument of createInstance must be a term.\n");
                if (this.env.program == null){
                    this.env.io.showMessageDialog("No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, retract and suppress) can be satisfied.", "Warning");
                    this.Return_Stack.makeEmpty();
                    return resultat;
                }
                let pRegle: PrologPlusCG.prolog.PrologRule = new PrologPlusCG.prolog.PrologRule();
                let aCple: PrologPlusCG.prolog.PrologTerm = new PrologPlusCG.prolog.PrologTerm();
                const uneDonId: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, this.env.compile.valSysCleBtCp);
                aCple.addData(uneDonId);
                const aTerm1: PrologPlusCG.prolog.PrologTerm = new PrologPlusCG.prolog.PrologTerm();
                aTerm1.addData(Arg1.pData);
                let ClePaquet: string = this.env.compile.valSysGEN + this.env.compile.nameOfArgument(aTerm1, -1);
                aCple.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, aTerm1));
                const uneDonVr: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uVariable, this.env.compile.valSysIdVar);
                aCple.addData(uneDonVr);
                pRegle.addTerm(aCple);
                aCple = new PrologPlusCG.prolog.PrologTerm();
                aCple.addData(uneDonId);
                aCple.addData(Arg2.pData);
                aCple.addData(uneDonVr);
                pRegle.addTerm(aCple);
                pRules = <PrologPlusCG.prolog.RuleVector>/* get */((m,k) => m[k]===undefined?null:m[k])(this.env.program, ClePaquet);
                if (pRules != null){
                    pRules.addRule(pRegle);
                } else {
                    pRules = new PrologPlusCG.prolog.RuleVector();
                    pRules.addRule(pRegle);
                    /* put */(this.env.program[ClePaquet] = pRules);
                }
                this.programModified = true;
                pRules = null;
                ClePaquet = null;
                pRegle = null;
                this.env.unification.Unif_Stack.pushEmptyRecord();
                pTermRes.pos = -1;
                this.Return_Stack.push(this.Exec_Stack.pop());
                resultat = true;
            } else if ((IdPred === ("asserta")) || (IdPred === ("assertz"))){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: asserta/z takes two arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(Arg1.pData != null, "Error: the first argument of asserta/z must be bound.\n");
                if ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)){
                    const unTrm: PrologPlusCG.prolog.PrologTerm = new PrologPlusCG.prolog.PrologTerm();
                    unTrm.addData(Arg1.pData);
                    Arg1.pData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, unTrm);
                } else {
                    this.ASSERT(Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm, "Error: the first argument of asserta/z must be a term or a CG.\n");
                }
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: the second argument of asserta/z must be a list.\n");
                if (this.env.program == null){
                    const strMessage: string = "No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, retract and suppress) can be satisfied.";
                    if (!this.env.bIsApplet){
                        this.env.io.showMessageDialog(strMessage, "Warning");
                    } else {
                        this.env.recordErrorMessage(strMessage);
                    }
                    this.Return_Stack.makeEmpty();
                    return false;
                }
                let pRule: PrologPlusCG.prolog.PrologRule = new PrologPlusCG.prolog.PrologRule();
                pRule.addTerm(this.assertTerm(<PrologPlusCG.prolog.PrologTerm>Arg1.pData.data, Arg1.index));
                pLstPrlg = <PrologPlusCG.prolog.PrologList>Arg2.pData.data;
                let uneDon: PrologPlusCG.prolog.PrologData;
                let unTrm: PrologPlusCG.prolog.PrologTerm;
                for(let listIndex: number = 0; listIndex < pLstPrlg.size(); ++listIndex) {{
                    uneDon = <PrologPlusCG.prolog.PrologData>pLstPrlg.get(listIndex);
                    if ((uneDon.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (uneDon.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) || (uneDon.typeOfData === PrologPlusCG.prolog.DataTypes.uVariable)){
                        unTrm = new PrologPlusCG.prolog.PrologTerm();
                        unTrm.addData(uneDon);
                        pRule.addTerm(this.assertTerm(unTrm, Arg2.index));
                    } else {
                        this.ASSERT((uneDon.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm), "Error: the second argument of asserta/z must be a list of terms or CG.\n");
                        pRule.addTerm(this.assertTerm(<PrologPlusCG.prolog.PrologTerm>uneDon.data, Arg2.index));
                    }
                };}
                pLstPrlg = null;
                uneDon = null;
                let ClePaquet: string = this.env.compile.nameOfArgument(pRule.getAt(0), Arg1.index);
                pRules = <PrologPlusCG.prolog.RuleVector>/* get */((m,k) => m[k]===undefined?null:m[k])(this.env.program, ClePaquet);
                if (pRules != null){
                    if (IdPred === ("asserta")){
                        try {
                            pRules.add(0, pRule);
                        } catch(exp) {
                        }
                    } else {
                        pRules.addRule(pRule);
                    }
                } else {
                    pRules = new PrologPlusCG.prolog.RuleVector();
                    pRules.addRule(pRule);
                    /* put */(this.env.program[ClePaquet] = pRules);
                }
                this.programModified = true;
                pRules = null;
                ClePaquet = null;
                pRule = null;
                this.env.unification.Unif_Stack.pushEmptyRecord();
                pTermRes.pos = -1;
                this.Return_Stack.push(this.Exec_Stack.pop());
                resultat = true;
            } else if (IdPred === ("retract")){
                this.ASSERT((pTermRes.pTerm.size() === 2), "Error: retract takes one argument.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(Arg1.pData != null, "Error: the argument of retract must be bound.\n");
                if ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)){
                    const unTrm: PrologPlusCG.prolog.PrologTerm = new PrologPlusCG.prolog.PrologTerm();
                    unTrm.addData(Arg1.pData);
                    Arg1.pData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, unTrm);
                } else {
                    this.ASSERT((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm), "Error: the argument of retract must be a term.\n");
                }
                let IdCle: string = this.env.compile.nameOfArgument(<PrologPlusCG.prolog.PrologTerm>Arg1.pData.data, Arg1.index);
                if (this.env.program == null){
                    this.env.io.showMessageDialog("No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, retract and suppress) can be satisfied.", "Warning");
                    this.Return_Stack.makeEmpty();
                    return resultat;
                }
                pRules = <PrologPlusCG.prolog.RuleVector>/* get */((m,k) => m[k]===undefined?null:m[k])(this.env.program, IdCle);
                if (pRules != null){
                    let Donnee2: PrologPlusCG.prolog.PrologData;
                    let uneRegle: PrologPlusCG.prolog.PrologRule;
                    let indRegle: number = 0;
                    for(let listIndex: number = 0; listIndex < pRules.size() && !resultat; ++listIndex) {{
                        uneRegle = pRules.get(listIndex);
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        const TopOfUnification_Stack: number = this.env.unification.Unif_Stack.indexOfTop();
                        Donnee2 = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, uneRegle.getAt(0));
                        resultat = this.env.unification.unify(Donnee2, TopOfUnification_Stack, Arg1.pData, Arg1.index);
                        if (resultat){
                            pTermRes.pos = -1;
                            this.Return_Stack.push(this.Exec_Stack.pop());
                            uneRegle.myDestroy();
                            uneRegle = null;
                            pRules.remove(indRegle);
                            if (pRules.isEmpty()){
                                /* remove */(map => { let deleted = this.env.program[IdCle];delete this.env.program[IdCle];return deleted;})(this.env.program);
                            }
                            this.programModified = true;
                        } else {
                            this.env.unification.Unif_Stack.pop();
                            indRegle++;
                        }
                    };}
                    Donnee2 = null;
                    uneRegle = null;
                } else {
                    resultat = false;
                }
                IdCle = null;
            } else if (IdPred === ("suppress")){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: suppress takes two arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error: the first argument of suppress must be an identifier.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error: the second argument of suppress must be an integer.\n");
                if (this.env.program == null){
                    this.env.io.showMessageDialog("No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, retract and suppress) can be satisfied.", "Warning");
                    this.Return_Stack.makeEmpty();
                    return resultat;
                }
                const Strg: string = this.env.compile.getTermSlashNumberOfArgumentsString(<string>Arg1.pData.data, /* intValue */((<number>Arg2.pData.data)|0));
                pRules = <PrologPlusCG.prolog.RuleVector>/* get */((m,k) => m[k]===undefined?null:m[k])(this.env.program, Strg);
                let uneRegle: PrologPlusCG.prolog.PrologRule;
                if (pRules != null){
                    for(let listIndex: number = 0; listIndex < pRules.size(); ++listIndex) {{
                        uneRegle = pRules.get(listIndex);
                        uneRegle.myDestroy();
                        uneRegle = null;
                    };}
                    pRules.clear();
                    /* remove */(map => { let deleted = this.env.program[Strg];delete this.env.program[Strg];return deleted;})(this.env.program);
                    this.programModified = true;
                    resultat = true;
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                }
            } else if (IdPred === ("isInstance")){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: instance takes two arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData != null) && ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString))), "Error : the first argument of isInstance should be an identifier or a string.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error : the second argument of isInstance should be an identifier.\n");
                try {
                    const aUnifyCG: PrologPlusCG.prolog.UnifyCG = new PrologPlusCG.prolog.UnifyCG(this.env);
                    resultat = aUnifyCG.conform(pTermRes.pTerm.getAt(1), pTermRes.index, <string>Arg2.pData.data);
                } catch(exex) {
                    resultat = false;
                }
                if (resultat){
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                }
            } else if (IdPred === ("addInstance")){
                if (this.env.typeHierarchy == null){
                    throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified.");
                }
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: addInstance takes two arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData != null) && ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString))), "Error : the first argument of addInstance should be an identifier or a string.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error : the second argument of addInstance should be an identifier.\n");
                this.env.typeHierarchy.addInstance(<string>Arg1.pData.data, <string>Arg2.pData.data);
                resultat = true;
                this.programModified = true;
                this.env.unification.Unif_Stack.pushEmptyRecord();
                pTermRes.pos = -1;
                this.Return_Stack.push(this.Exec_Stack.pop());
            } else if (IdPred === ("free")){
                this.ASSERT((pTermRes.pTerm.size() === 2), "Error: free takes one argument.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                resultat = (Arg1.pData == null);
                if (resultat){
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                }
            } else if (IdPred === ("val")){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: val takes two arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData == null) || (pTermRes.pTerm.getAt(1).typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error: the first argument of val must be a free variable or an object identifier.\n");
                let donTmp: PrologPlusCG.prolog.PrologData = null;
                if (pTermRes.pTerm.getAt(2).typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier){
                    const IdObj: string = <string>pTermRes.pTerm.getAt(2).data;
                    donTmp = <PrologPlusCG.prolog.PrologData>/* get */((m,k) => m[k]===undefined?null:m[k])(this.globalPrlgPCGObjs, IdObj);
                    this.ASSERT((donTmp != null), "Error : The object " + IdObj + " is unknown.\n");
                } else {
                    donTmp = this.evalExpr(pTermRes.pTerm.getAt(2), pTermRes.index);
                }
                this.env.unification.Unif_Stack.pushEmptyRecord();
                if (pTermRes.pTerm.getAt(1).typeOfData === PrologPlusCG.prolog.DataTypes.uVariable){
                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, donTmp, pTermRes.index);
                } else {
                    const IdObj: string = <string>pTermRes.pTerm.getAt(1).data;
                    /* put */(this.globalPrlgPCGObjs[IdObj] = donTmp);
                    resultat = true;
                }
                this.ASSERT((resultat === true), "Error: the two arguments of val should be unified");
                pTermRes.pos = -1;
                this.Return_Stack.push(this.Exec_Stack.pop());
            } else if ((IdPred === ("sup")) || (IdPred === ("inf")) || (IdPred === ("eqv"))){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: " + IdPred + " takes two arguments.\n");
                const uneDonTrans1: PrologPlusCG.prolog.PrologData = this.evalExpr(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((uneDonTrans1 != null) && (uneDonTrans1.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error : the expression should return a number.");
                const val1: number = <number>uneDonTrans1.data;
                const uneDonTrans2: PrologPlusCG.prolog.PrologData = this.evalExpr(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((uneDonTrans2 != null) && (uneDonTrans2.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error : the expression should return a number.");
                const val2: number = <number>uneDonTrans2.data;
                if (IdPred === ("sup")){
                    resultat = /* doubleValue */val1 > /* doubleValue */val2;
                } else if (IdPred === ("inf")){
                    resultat = /* doubleValue */val1 < /* doubleValue */val2;
                } else if (IdPred === ("eqv")){
                    resultat = /* doubleValue */val1 === /* doubleValue */val2;
                }
                if (resultat){
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                }
            } else if (IdPred === ("seed")){
                this.ASSERT((pTermRes.pTerm.size() === 2), "Error: " + IdPred + " takes one argument.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error: the argument of  " + IdPred + " must be a number between 0 and 2,100,000,000.\n");
                const val1: number = <number>Arg1.pData.data;
                const val1Long: number = /* longValue */val1;
                this.ASSERT(val1Long >= 0 && val1Long <= 2100000000, "Error: the argument of  " + IdPred + " must be a number between 0 and 2,100,000,000.\n");
                this.rndRandom.setSeed(val1Long);
                this.env.unification.Unif_Stack.pushEmptyRecord();
                pTermRes.pos = -1;
                this.Return_Stack.push(this.Exec_Stack.pop());
                resultat = true;
            } else if (IdPred === ("rnd")){
                this.ASSERT((pTermRes.pTerm.size() === 4), "Error: " + IdPred + " takes three arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error: the first argument of  " + IdPred + " must be a number between 0 and 2,100,000,000.\n");
                const val1: number = <number>Arg1.pData.data;
                const val1Long: number = /* longValue */val1;
                this.ASSERT(val1Long >= 0 && val1Long <= 2100000000, "Error: the first argument of  " + IdPred + " must be a number between 0 and 2,100,000,000.\n");
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error: the second argument of  " + IdPred + " must be a number between 0 and 2,100,000,000.\n");
                const val2: number = <number>Arg2.pData.data;
                const val2Long: number = /* longValue */val2;
                this.ASSERT(val2Long >= 0 && val2Long <= 2100000000, "Error: the second argument of  " + IdPred + " must be a number between 0 and 2,100,000,000.\n");
                this.ASSERT(val1Long <= val2Long, "Error: the first argument of  " + IdPred + " must be less than or equal to the second argument.\n");
                const Arg3: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                this.ASSERT(Arg3.pData == null, "Error: the third argument of  " + IdPred + " must be a free variable.\n");
                const randomDouble: number = this.rndRandom.nextDouble();
                const myDifference: number = <number>val2Long - val1Long;
                const mySolutionDouble: number = (myDifference * randomDouble) + val1Long;
                const mySolutionDoubleObject: number = new Number(mySolutionDouble).valueOf();
                const mySolutionAtomicDouble: number = Math.floor(/* doubleValue */mySolutionDoubleObject);
                const mySolutionLong: number = new Number((n => n<0?Math.ceil(n):Math.floor(n))(<number>mySolutionAtomicDouble)).valueOf();
                const aPrologData: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uNumber, mySolutionLong);
                this.env.unification.Unif_Stack.pushEmptyRecord();
                resultat = this.env.unification.unify(aPrologData, pTermRes.index, pTermRes.pTerm.getAt(3), pTermRes.index);
                pTermRes.pos = -1;
                this.Return_Stack.push(this.Exec_Stack.pop());
                resultat = true;
            } else if (IdPred === ("eq")){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: eq takes two arguments.\n");
                this.env.unification.Unif_Stack.pushEmptyRecord();
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                if ((Arg1.pData != null) && ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uConcept)) && (Arg2.pData != null) && ((Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uConcept))){
                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(2), pTermRes.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                } else {
                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, pTermRes.pTerm.getAt(2), pTermRes.index);
                }
                if (resultat){
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                } else {
                    this.env.unification.Unif_Stack.pop();
                }
            } else if (IdPred === ("dif")){
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: dif takes two arguments.\n");
                this.env.unification.Unif_Stack.pushEmptyRecord();
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                if ((Arg1.pData != null) && ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uConcept)) && (Arg2.pData != null) && ((Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uConcept))){
                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(2), pTermRes.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                } else {
                    resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, pTermRes.pTerm.getAt(2), pTermRes.index);
                }
                resultat = !resultat;
                if (resultat){
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                } else {
                    this.env.unification.Unif_Stack.pop();
                }
            } else if (IdPred === ("fail")){
                resultat = false;
            } else if ((IdPred === ("isSubType")) || (IdPred === ("isSuperType"))){
                if (this.env.typeHierarchy == null){
                    throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified.");
                }
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: " + IdPred + " takes two arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier), "Error: the first argument of " + IdPred + " must be an identifier.\n");
                const Type1: string = <string>Arg1.pData.data;
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT((Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier), "Error: the second argument of " + IdPred + " must be an identifier.\n");
                const Type2: string = <string>Arg2.pData.data;
                if (IdPred === ("isSubType")){
                    resultat = this.env.typeHierarchy.isSubType(Type1, Type2);
                } else {
                    resultat = this.env.typeHierarchy.isSuperType(Type1, Type2);
                }
                if (resultat){
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                }
            } else if ((IdPred === ("immediateSubTypes")) || (IdPred === ("immediateSuperTypes")) || (IdPred === ("subTypes")) || (IdPred === ("superTypes"))){
                if (this.env.typeHierarchy == null){
                    throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified.");
                }
                this.ASSERT((pTermRes.pTerm.size() === 3), "Error: " + IdPred + " takes two arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier), "Error: the first argument of " + IdPred + " must be an identifier.\n");
                const Type: string = <string>Arg1.pData.data;
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT(((Arg2.pData == null) || (Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: the second argument of " + IdPred + " must be a free variable or a list.\n");
                let L: PrologPlusCG.prolog.PrologData = null;
                if (IdPred === ("immediateSubTypes")){
                    L = this.env.typeHierarchy.immediateSubTypes(Type);
                } else if (IdPred === ("immediateSuperTypes")){
                    L = this.env.typeHierarchy.immediateSuperTypes(Type);
                } else if (IdPred === ("subTypes")){
                    L = this.env.typeHierarchy.subTypes(Type);
                } else {
                    L = this.env.typeHierarchy.superTypes(Type);
                }
                this.env.unification.Unif_Stack.pushEmptyRecord();
                resultat = this.env.unification.unify(pTermRes.pTerm.getAt(2), pTermRes.index, L, pTermRes.index);
                if (resultat){
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                } else {
                    this.env.unification.Unif_Stack.pop();
                }
            } else if ((IdPred === ("maxComSubTypes")) || (IdPred === ("minComSuperTypes"))){
                if (this.env.typeHierarchy == null){
                    throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified.");
                }
                this.ASSERT((pTermRes.pTerm.size() === 4), "Error:" + IdPred + " takes tree arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier), "Error: the first argument of " + IdPred + " must be an identifier.\n");
                const Type1: string = <string>Arg1.pData.data;
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT((Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier), "Error: the second argument of " + IdPred + " must be an identifier.\n");
                const Type2: string = <string>Arg2.pData.data;
                const Arg3: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                this.ASSERT(((Arg3.pData == null) || (Arg3.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList)), "Error: the third argument of " + IdPred + " must be a free variable or a list.\n");
                let Types3: Array<string> = null;
                if (IdPred === ("maxComSubTypes")){
                    Types3 = this.env.typeHierarchy.maxComSubTypes(Type1, Type2);
                } else {
                    Types3 = this.env.typeHierarchy.minComSuperTypes(Type1, Type2);
                }
                const aList: PrologPlusCG.prolog.PrologList = new PrologPlusCG.prolog.PrologList();
                for(let listIndex: number = 0; listIndex < /* size */(<number>Types3.length); ++listIndex) {{
                    const aType: string = /* get */Types3[listIndex];
                    const aDonnee: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, aType);
                    aList.addData(aDonnee);
                };}
                this.env.unification.Unif_Stack.pushEmptyRecord();
                resultat = this.env.unification.unify(pTermRes.pTerm.getAt(3), pTermRes.index, new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, aList), pTermRes.index);
                if (resultat){
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                } else {
                    this.env.unification.Unif_Stack.pop();
                }
            } else if ((IdPred === ("maxComSubType")) || (IdPred === ("minComSuperType"))){
                if (this.env.typeHierarchy == null){
                    throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified.");
                }
                this.ASSERT((pTermRes.pTerm.size() === 4), "Error:" + IdPred + " takes tree arguments.\n");
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                this.ASSERT((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier), "Error: the first argument of " + IdPred + " must be an identifier.\n");
                const Type1: string = <string>Arg1.pData.data;
                Arg2 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                this.ASSERT((Arg2.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier), "Error: the second argument of " + IdPred + " must be an identifier.\n");
                const Type2: string = <string>Arg2.pData.data;
                const Arg3: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(3), pTermRes.index);
                this.ASSERT(((Arg3.pData == null) || (Arg3.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier)), "Error: the third argument of " + IdPred + " must be a free variable or an identifier.\n");
                let Type3: string = null;
                if (IdPred === ("maxComSubType")){
                    Type3 = this.env.typeHierarchy.maxComSubType(Type1, Type2);
                } else {
                    Type3 = this.env.typeHierarchy.minComSuperType(Type1, Type2);
                }
                this.env.unification.Unif_Stack.pushEmptyRecord();
                resultat = this.env.unification.unify(pTermRes.pTerm.getAt(3), pTermRes.index, new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, Type3), pTermRes.index);
                if (resultat){
                    pTermRes.pos = -1;
                    this.Return_Stack.push(this.Exec_Stack.pop());
                } else {
                    this.env.unification.Unif_Stack.pop();
                }
            }
            if (!resultat){
                pTermRes.pos = 0;
            }
            return resultat;
        }

        /**
         * Dans cette nouvelle version : on cree une instanciation en profondeur du
         * du term. Pour cela, on ecrit le term dans le tampon
         * env.printer.nodeTreeDebug pour avoir la forme instanciee, en chaine de
         * caracteres et ensuite on la compile pour avoir sa representation interne
         * @param {PrologPlusCG.prolog.PrologTerm} pTerme
         * @param {number} niv
         * @return {PrologPlusCG.prolog.PrologTerm}
         */
        assertTerm(pTerme: PrologPlusCG.prolog.PrologTerm, niv: number): PrologPlusCG.prolog.PrologTerm {
            this.env.bWriteToDebugTree = true;
            this.env.printer.alternatePrintString = "";
            this.env.printer.printTerm$PrologPlusCG_prolog_PrologTerm$int(pTerme, niv);
            const trm: PrologPlusCG.prolog.PrologTerm = this.env.compile.compileTerm(this.env.printer.alternatePrintString);
            this.env.printer.alternatePrintString = "";
            this.env.bWriteToDebugTree = false;
            return trm;
        }

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
        public resatisfyPredicateGoal(pTermRes: PrologPlusCG.prolog.TermToBeResolved, IdPred: string): boolean {
            let resultat: boolean = false;
            let pLocalRules: PrologPlusCG.prolog.RuleVector = null;
            if (IdPred === ("branchOfCG")){
                const Arg2: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                const unGC: PrologPlusCG.cg.CG = <PrologPlusCG.cg.CG>Arg2.pData.data;
                const vctRels: Array<PrologPlusCG.cg.Relation> = unGC.m_vctRelations;
                const nbreBranch: number = /* size */(<number>vctRels.length);
                while(((pTermRes.pos < nbreBranch) && !resultat)) {{
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    const unGCBranch: PrologPlusCG.cg.CG = this.createCGBranch(<PrologPlusCG.cg.Relation>/* elementAt */vctRels[pTermRes.pos]);
                    resultat = this.env.unification.unify(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uCG, unGCBranch), Arg2.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                    pTermRes.pos++;
                    if (resultat){
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    } else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }};
            } else if (IdPred === ("concOfCG")){
                const Arg2: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                const unGC: PrologPlusCG.cg.CG = <PrologPlusCG.cg.CG>Arg2.pData.data;
                const vctConcepts: Array<PrologPlusCG.cg.Concept> = unGC.m_vctConcepts;
                const nbreConcs: number = /* size */(<number>vctConcepts.length);
                resultat = false;
                const Arg1: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                while(((pTermRes.pos < nbreConcs) && !resultat)) {{
                    this.env.unification.Unif_Stack.pushEmptyRecord();
                    const concCour: PrologPlusCG.cg.Concept = <PrologPlusCG.cg.Concept>/* elementAt */vctConcepts[pTermRes.pos];
                    if (Arg1.pData == null){
                        resultat = this.env.unification.unify(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uConcept, concCour), Arg2.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                    } else {
                        const gTmp: PrologPlusCG.cg.CG = new PrologPlusCG.cg.CG();
                        gTmp.addConcept(concCour);
                        resultat = this.env.unification.unify(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uCG, gTmp), Arg2.index, pTermRes.pTerm.getAt(1), pTermRes.index);
                    }
                    pTermRes.pos++;
                    if (resultat){
                        this.Return_Stack.push(this.Exec_Stack.pop());
                    } else {
                        this.env.unification.Unif_Stack.pop();
                    }
                }};
            } else if (IdPred === ("member")){
                const Arg2: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2), pTermRes.index);
                let pLstPrlg: PrologPlusCG.prolog.PrologList = null;
                let Arg2Niv: number = Arg2.index;
                if (pTermRes.lstMember == null){
                    pLstPrlg = <PrologPlusCG.prolog.PrologList>Arg2.pData.data;
                } else {
                    pLstPrlg = pTermRes.lstMember;
                    Arg2Niv = pTermRes.indLstMember;
                }
                let dernierInd: number = pLstPrlg.size() - 1;
                let finished: boolean = false;
                while((!finished && !resultat)) {{
                    while(((pTermRes.pos < dernierInd) && !resultat)) {{
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, pLstPrlg.getAt(pTermRes.pos), Arg2Niv);
                        pTermRes.pos++;
                        if (resultat){
                            this.Return_Stack.push(this.Exec_Stack.pop());
                        } else {
                            this.env.unification.Unif_Stack.pop();
                        }
                    }};
                    if (!resultat && (pTermRes.pos === dernierInd)){
                        if (pLstPrlg.getAt(dernierInd).typeOfData === PrologPlusCG.prolog.DataTypes.uVarList){
                            const contr: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pLstPrlg.getAt(dernierInd), Arg2Niv);
                            this.ASSERT((contr.pData != null) && (contr.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uList), "Error: The second argument of member should be a list.\n");
                            pLstPrlg = <PrologPlusCG.prolog.PrologList>contr.pData.data;
                            Arg2Niv = contr.index;
                            pTermRes.lstMember = pLstPrlg;
                            pTermRes.indLstMember = contr.index;
                            dernierInd = pLstPrlg.size() - 1;
                            pTermRes.pos = 0;
                        } else {
                            this.env.unification.Unif_Stack.pushEmptyRecord();
                            resultat = this.env.unification.unify(pTermRes.pTerm.getAt(1), pTermRes.index, pLstPrlg.getAt(dernierInd), Arg2Niv);
                            pTermRes.pos++;
                            if (resultat){
                                this.Return_Stack.push(this.Exec_Stack.pop());
                            } else {
                                this.env.unification.Unif_Stack.pop();
                            }
                            finished = true;
                        }
                    } else {
                        finished = true;
                    }
                }};
                if (!resultat){
                    pTermRes.lstMember = null;
                    pTermRes.indLstMember = 0;
                }
            } else if (IdPred === ("not")){
                if (pTermRes.pos === -1){
                    for(let i: number = this.Return_Stack.indexOfTop(); ((i > pTermRes.indexInExecStack) && (i >= 0)); i--) {{
                        this.Return_Stack.pop();
                        this.env.unification.Unif_Stack.pop();
                    };}
                    pTermRes.indexInExecStack = -1;
                }
            } else if (IdPred === ("findall")){
                if (pTermRes.indLstMember !== -1){
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
            } else if (IdPred === ("retract")){
                let Arg1: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                Arg1 = this.env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1), pTermRes.index);
                if ((Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG)){
                    const unTrm: PrologPlusCG.prolog.PrologTerm = new PrologPlusCG.prolog.PrologTerm();
                    unTrm.addData(Arg1.pData);
                    Arg1.pData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, unTrm);
                }
                let IdCle: string = this.env.compile.nameOfArgument(<PrologPlusCG.prolog.PrologTerm>Arg1.pData.data, Arg1.index);
                pLocalRules = <PrologPlusCG.prolog.RuleVector>/* get */((m,k) => m[k]===undefined?null:m[k])(this.env.program, IdCle);
                if (pLocalRules != null){
                    let data2: PrologPlusCG.prolog.PrologData;
                    let aRule: PrologPlusCG.prolog.PrologRule;
                    let indRegle: number = 0;
                    for(let listIndex: number = 0; listIndex < pLocalRules.size() && !resultat; ++listIndex) {{
                        aRule = pLocalRules.get(listIndex);
                        this.env.unification.Unif_Stack.pushEmptyRecord();
                        const TopOfUnification_Stack: number = this.env.unification.Unif_Stack.indexOfTop();
                        data2 = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uTerm, aRule.getAt(0));
                        resultat = this.env.unification.unify(data2, TopOfUnification_Stack, Arg1.pData, Arg1.index);
                        if (resultat){
                            this.Return_Stack.push(this.Exec_Stack.pop());
                            aRule.myDestroy();
                            aRule = null;
                            pLocalRules.remove(indRegle);
                            if (pLocalRules.isEmpty()){
                                /* remove */(map => { let deleted = this.env.program[IdCle];delete this.env.program[IdCle];return deleted;})(this.env.program);
                            }
                            this.programModified = true;
                        } else {
                            this.env.unification.Unif_Stack.pop();
                            indRegle++;
                        }
                    };}
                    data2 = null;
                    aRule = null;
                } else {
                    resultat = false;
                }
                IdCle = null;
            }
            if (!resultat){
                pTermRes.pos = 0;
            }
            return resultat;
        }

        evalExpr(pDon: PrologPlusCG.prolog.PrologData, niv: number): PrologPlusCG.prolog.PrologData {
            let aNumber: number = null;
            let Arg1: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pDon, niv);
            this.ASSERT((Arg1.pData != null), "Error: any variable in an expression should have a value.\n");
            if (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber){
                aNumber = <number>Arg1.pData.data;
            } else if (Arg1.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uTerm){
                const pTerm: PrologPlusCG.prolog.PrologTerm = <PrologPlusCG.prolog.PrologTerm>Arg1.pData.data;
                const IdTerm: string = <string>pTerm.getAt(0).data;
                this.ASSERT(((IdTerm === ("add")) || (IdTerm === ("sub")) || (IdTerm === ("mul")) || (IdTerm === ("div"))), "Error: an operator in an expression must be add, sub, mul or div.\n");
                this.ASSERT((pTerm.size() === 3), "Error: any operator must have two arguments.\n");
                const aDataTrans1: PrologPlusCG.prolog.PrologData = this.evalExpr(pTerm.getAt(1), Arg1.index);
                this.ASSERT(((aDataTrans1 != null) && (aDataTrans1.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error : the operand should be a number.");
                const val1: number = <number>aDataTrans1.data;
                const aDataTrans2: PrologPlusCG.prolog.PrologData = this.evalExpr(pTerm.getAt(2), Arg1.index);
                this.ASSERT(((aDataTrans2 != null) && (aDataTrans2.typeOfData === PrologPlusCG.prolog.DataTypes.uNumber)), "Error : the operand should be a number.");
                const val2: number = <number>aDataTrans2.data;
                if ((typeof val1 === 'number') && (typeof val2 === 'number')){
                    let nbreEntier: number = 0;
                    if (IdTerm === ("add")){
                        nbreEntier = /* intValue */(val1|0) + /* intValue */(val2|0);
                    } else if (IdTerm === ("sub")){
                        nbreEntier = /* intValue */(val1|0) - /* intValue */(val2|0);
                    } else if (IdTerm === ("mul")){
                        nbreEntier = /* intValue */(val1|0) * /* intValue */(val2|0);
                    }
                    aNumber = new Number(nbreEntier).valueOf();
                    if (IdTerm === ("div")){
                        let nbreDouble: number = 0.0;
                        nbreDouble = /* doubleValue */val1 / /* doubleValue */val2;
                        aNumber = new Number(nbreDouble).valueOf();
                    }
                } else {
                    let nbreDouble: number = 0.0;
                    if (IdTerm === ("add")){
                        nbreDouble = /* doubleValue */val1 + /* doubleValue */val2;
                    } else if (IdTerm === ("sub")){
                        nbreDouble = /* doubleValue */val1 - /* doubleValue */val2;
                    } else if (IdTerm === ("mul")){
                        nbreDouble = /* doubleValue */val1 * /* doubleValue */val2;
                    } else {
                        nbreDouble = /* doubleValue */val1 / /* doubleValue */val2;
                    }
                    aNumber = new Number(nbreDouble).valueOf();
                }
            } else {
                this.ASSERT(false, "Error: an element in an expression is neither a number nor an operator.\n");
            }
            Arg1 = null;
            return new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uNumber, aNumber);
        }

        public clear_globalPrlgPCGObjs() {
            /* clear */(obj => { for (let member in obj) delete obj[member]; })(this.globalPrlgPCGObjs);
        }

        copyAllOfTheListWithUnification(aList: PrologPlusCG.prolog.PrologList, level: number): PrologPlusCG.prolog.PrologList {
            if (aList.isEmpty()){
                return aList;
            }
            const newList: PrologPlusCG.prolog.PrologList = new PrologPlusCG.prolog.PrologList();
            this.copyListWithUnification(aList, level, newList);
            let lastElem: PrologPlusCG.prolog.PrologData = <PrologPlusCG.prolog.PrologData>aList.lastElement();
            let finished: boolean = false;
            let ValVarList: PrologPlusCG.prolog.PrologDataIndexPair = null;
            let valLevel: number = level;
            let aList1: PrologPlusCG.prolog.PrologList = null;
            while((!finished)) {{
                ValVarList = this.env.unification.valueFromUnifStack(lastElem, valLevel);
                valLevel = ValVarList.index;
                if (lastElem.typeOfData === PrologPlusCG.prolog.DataTypes.uVarList){
                    if ((ValVarList.pData != null) && (ValVarList.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uList)){
                        throw new PrologPlusCG.prolog.ExecException("The value of the variable after | should be a list.\n");
                    } else if (ValVarList.pData != null){
                        aList1 = <PrologPlusCG.prolog.PrologList>ValVarList.pData.data;
                        this.copyListWithUnification(aList1, ValVarList.index, newList);
                        try {
                            lastElem = <PrologPlusCG.prolog.PrologData>aList1.lastElement();
                        } catch(expt) {
                            finished = true;
                        }
                    } else {
                        throw new PrologPlusCG.prolog.ExecException("Warning : The list is partially specified; the variable after | is free.\n");
                    }
                } else {
                    finished = true;
                    newList.addData(ValVarList.pData);
                }
            }};
            return newList;
        }

        copyListWithUnification(aList: PrologPlusCG.prolog.PrologList, level: number, newList: PrologPlusCG.prolog.PrologList) {
            const indexOfLastElement: number = aList.size() - 1;
            for(let i: number = 0; i < indexOfLastElement; i++) {{
                const contr: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(<PrologPlusCG.prolog.PrologData>aList.elementAt(i), level);
                newList.addData(contr.pData);
            };}
        }

        createCGBranch(rel: PrologPlusCG.cg.Relation): PrologPlusCG.cg.CG {
            const newRelation: PrologPlusCG.cg.Relation = new PrologPlusCG.cg.Relation();
            newRelation.m_pdRelationName = rel.m_pdRelationName;
            const concSrce: PrologPlusCG.cg.Concept = rel.m_concSource;
            const newConcSrce: PrologPlusCG.cg.Concept = new PrologPlusCG.cg.Concept(concSrce.m_pdType, concSrce.m_pdReferent, concSrce.m_pdValue, this.env);
            newConcSrce.addOutgoingRelation(newRelation);
            newRelation.m_concSource = newConcSrce;
            const concDest: PrologPlusCG.cg.Concept = rel.m_concDestination;
            const newConcDest: PrologPlusCG.cg.Concept = new PrologPlusCG.cg.Concept(concDest.m_pdType, concDest.m_pdReferent, concDest.m_pdValue, this.env);
            newConcDest.addIncomingRelation(newRelation);
            newRelation.m_concDestination = newConcDest;
            const nouvVctConcs: Array<PrologPlusCG.cg.Concept> = <any>([]);
            /* addElement */(nouvVctConcs.push(newConcSrce)>0);
            /* addElement */(nouvVctConcs.push(newConcDest)>0);
            const newVctRels: Array<PrologPlusCG.cg.Relation> = <any>([]);
            /* addElement */(newVctRels.push(newRelation)>0);
            return new PrologPlusCG.cg.CG(nouvVctConcs, newVctRels);
        }

        isVariableGoal(strIdVar: string, aTerm: PrologPlusCG.prolog.PrologData): boolean {
            this.env.bWriteToDebugTree = true;
            this.env.printer.alternatePrintString = "";
            this.env.printer.printPrologData(aTerm, -1);
            const str: string = this.env.printer.alternatePrintString;
            this.env.printer.alternatePrintString = "";
            this.env.bWriteToDebugTree = false;
            let indDebStr: number = str.indexOf(strIdVar);
            let valRet: boolean = false;
            if (indDebStr >= 0){
                const taille: number = strIdVar.length;
                let carAvDeb: string;
                let carAprFin: string;
                while(((indDebStr >= 0) && !valRet)) {{
                    carAvDeb = str.charAt(indDebStr - 1);
                    carAprFin = str.charAt(indDebStr + taille);
                    if (!/* isLetterOrDigit *//[a-zA-Z\d]/.test(carAvDeb[0]) && ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(carAvDeb) != '_'.charCodeAt(0)) && !/* isLetterOrDigit *//[a-zA-Z\d]/.test(carAprFin[0]) && ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(carAprFin) != '_'.charCodeAt(0))){
                        valRet = true;
                    } else {
                        indDebStr = str.indexOf(strIdVar, indDebStr + taille);
                    }
                }};
            }
            return valRet;
        }

        typeFromClass(aClass: any): number {
            const strClassName: string = /* getName */(c => typeof c === 'string' ? c : c["__class"] ? c["__class"] : c["name"])(aClass);
            let resultType: number = 0;
            if ((strClassName === ("java.lang.Integer")) || (strClassName === ("int")) || (strClassName === ("java.lang.Long")) || (strClassName === ("long")) || (strClassName === ("java.lang.Double")) || (strClassName === ("double"))){
                resultType = PrologPlusCG.prolog.DataTypes.uNumber;
            } else if ((strClassName === ("java.lang.Boolean")) || (strClassName === ("boolean"))){
                resultType = PrologPlusCG.prolog.DataTypes.uBoolean;
            } else if (strClassName === ("java.lang.String")){
                resultType = PrologPlusCG.prolog.DataTypes.uString;
            } else {
                resultType = PrologPlusCG.prolog.DataTypes.uObject;
            }
            return resultType;
        }

        typeFromString(nameOfClass: string): number {
            let result: number = 0;
            if ((nameOfClass === ("Long")) || (nameOfClass === ("Double"))){
                result = PrologPlusCG.prolog.DataTypes.uNumber;
            } else if (nameOfClass === ("Boolean")){
                result = PrologPlusCG.prolog.DataTypes.uBoolean;
            } else if (nameOfClass === ("String")){
                result = PrologPlusCG.prolog.DataTypes.uString;
            } else {
                result = PrologPlusCG.prolog.DataTypes.uObject;
            }
            return result;
        }

        typeIsPrimitive(typDon: number): boolean {
            return ((typDon === PrologPlusCG.prolog.DataTypes.uNumber) || (typDon === PrologPlusCG.prolog.DataTypes.uBoolean) || (typDon === PrologPlusCG.prolog.DataTypes.uIdentifier) || (typDon === PrologPlusCG.prolog.DataTypes.uString));
        }

        primitiveTypeToString(pData: PrologPlusCG.prolog.PrologData): string {
            this.ASSERT(this.typeIsPrimitive(pData.typeOfData), "Error: wrong type of PrologData: Should be a number, a boolean, an identifier, or a string.\n");
            switch((pData.typeOfData)) {
            case 0 /* uNumber */:
                if (typeof pData.data === 'number'){
                    const valLong: number = (<number>pData.data);
                    return "\"" + valLong.toString() + "\"";
                } else {
                    const valDble: number = (<number>pData.data);
                    return "\"" + valDble.toString() + "\"";
                }
            case 1 /* uBoolean */:
                {
                    const valBool: boolean = /* booleanValue */(<boolean>pData.data);
                    if (valBool){
                        return "\"true\"";
                    } else {
                        return "\"false\"";
                    }
                };
            case 2 /* uIdentifier */:
                return "\"" + <string>pData.data + "\"";
            case 3 /* uString */:
                return <string>pData.data;
            }
            this.ASSERT(false, "Unreachable code reached in Resolution.primitiveTypeToString");
            return "";
        }
    }
    Resolution["__class"] = "PrologPlusCG.prolog.Resolution";
    Resolution["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];


}
namespace PrologPlusCG.prolog {
    export class ResolutionStack {
        vec: Array<PrologPlusCG.prolog.TermToBeResolved>;

        constructor() {
            if (this.vec === undefined) { this.vec = null; }
            this.vec = <any>([]);
        }

        public indexOfTop(): number {
            return (/* size */(<number>this.vec.length) - 1);
        }

        public push(trmRes: PrologPlusCG.prolog.TermToBeResolved) {
            /* add */(this.vec.push(trmRes)>0);
        }

        public lastElement(): PrologPlusCG.prolog.TermToBeResolved {
            return /* get */this.vec[/* size */(<number>this.vec.length) - 1];
        }

        public pop(): PrologPlusCG.prolog.TermToBeResolved {
            const termRes: PrologPlusCG.prolog.TermToBeResolved = <PrologPlusCG.prolog.TermToBeResolved>this.lastElement();
            /* remove */this.vec.splice(/* size */(<number>this.vec.length) - 1, 1)[0];
            return termRes;
        }

        public getTop(): PrologPlusCG.prolog.TermToBeResolved {
            return <PrologPlusCG.prolog.TermToBeResolved>this.lastElement();
        }

        public makeEmpty() {
            /* clear */(this.vec.length = 0);
        }

        public isEmpty(): boolean {
            return /* isEmpty */(this.vec.length == 0);
        }

        public size(): number {
            return /* size */(<number>this.vec.length);
        }

        public get(i: number): PrologPlusCG.prolog.TermToBeResolved {
            return /* get */this.vec[i];
        }
    }
    ResolutionStack["__class"] = "PrologPlusCG.prolog.ResolutionStack";

}
namespace PrologPlusCG.prolog {
    export class RuleVector {
        vec: Array<PrologPlusCG.prolog.PrologRule>;

        constructor() {
            if (this.vec === undefined) { this.vec = null; }
            this.vec = <any>([]);
        }

        public getAt(i: number): PrologPlusCG.prolog.PrologRule {
            return /* get */this.vec[i];
        }

        public get(i: number): PrologPlusCG.prolog.PrologRule {
            return /* get */this.vec[i];
        }

        public size(): number {
            return /* size */(<number>this.vec.length);
        }

        public addRule(regle: PrologPlusCG.prolog.PrologRule) {
            /* addElement */(this.vec.push(regle)>0);
        }

        public trimToSize() {
        }

        public add(i: number, pRule: PrologPlusCG.prolog.PrologRule) {
            /* add */this.vec.splice(i, 0, pRule);
        }

        public remove(indRegle: number) {
            /* remove */this.vec.splice(indRegle, 1)[0];
        }

        public isEmpty(): boolean {
            return /* isEmpty */(this.vec.length == 0);
        }

        public clear() {
            /* clear */(this.vec.length = 0);
        }
    }
    RuleVector["__class"] = "PrologPlusCG.prolog.RuleVector";

}
namespace PrologPlusCG.prolog {
    export class StringTermIndexTriple {
        public frmNonInst: string;

        public term: PrologPlusCG.prolog.PrologTerm;

        public index: number;

        public constructor(frmNInst: string, pTerm: PrologPlusCG.prolog.PrologTerm, nIndex: number) {
            if (this.frmNonInst === undefined) { this.frmNonInst = null; }
            if (this.term === undefined) { this.term = null; }
            if (this.index === undefined) { this.index = 0; }
            this.frmNonInst = frmNInst;
            this.term = pTerm;
            this.index = nIndex;
        }
    }
    StringTermIndexTriple["__class"] = "PrologPlusCG.prolog.StringTermIndexTriple";

}
namespace PrologPlusCG.prolog {
    export class TermToBeResolved {
        pTerm: PrologPlusCG.prolog.PrologTerm;

        index: number;

        pos: number;

        indexInExecStack: number;

        Cle: string;

        lstMember: PrologPlusCG.prolog.PrologList;

        indLstMember: number;

        public constructor(paramTerm?: any, paramIndex?: any, paramPos?: any) {
            if (((paramTerm != null && paramTerm instanceof <any>PrologPlusCG.prolog.PrologTerm) || paramTerm === null) && ((typeof paramIndex === 'number') || paramIndex === null) && ((typeof paramPos === 'number') || paramPos === null)) {
                let __args = arguments;
                if (this.pTerm === undefined) { this.pTerm = null; } 
                if (this.index === undefined) { this.index = 0; } 
                if (this.pos === undefined) { this.pos = 0; } 
                if (this.indexInExecStack === undefined) { this.indexInExecStack = 0; } 
                if (this.Cle === undefined) { this.Cle = null; } 
                if (this.lstMember === undefined) { this.lstMember = null; } 
                if (this.indLstMember === undefined) { this.indLstMember = 0; } 
                this.lstMember = null;
                this.indLstMember = 0;
                this.pTerm = paramTerm;
                this.index = paramIndex;
                this.pos = paramPos;
                this.indexInExecStack = -1;
            } else if (paramTerm === undefined && paramIndex === undefined && paramPos === undefined) {
                let __args = arguments;
                if (this.pTerm === undefined) { this.pTerm = null; } 
                if (this.index === undefined) { this.index = 0; } 
                if (this.pos === undefined) { this.pos = 0; } 
                if (this.indexInExecStack === undefined) { this.indexInExecStack = 0; } 
                if (this.Cle === undefined) { this.Cle = null; } 
                if (this.lstMember === undefined) { this.lstMember = null; } 
                if (this.indLstMember === undefined) { this.indLstMember = 0; } 
                this.lstMember = null;
                this.indLstMember = 0;
            } else throw new Error('invalid overload');
        }
    }
    TermToBeResolved["__class"] = "PrologPlusCG.prolog.TermToBeResolved";

}
namespace PrologPlusCG.prolog {
    export class TypeHierarchy implements PrologPlusCG.prolog.DataTypes {
        vctAscDescTyp1: Array<PrologPlusCG.prolog.IdentifierIndexPair>;

        vctAscDescTyp2: Array<string>;

        FirstSonFatherList1: number;

        LastSonFatherList1: number;

        FirstSonFatherList2: number;

        LastSonFatherList2: number;

        descendant: boolean;

        hierarchy: any;

        /*private*/ env: PrologPlusCG.prolog.PPCGEnv;

        public constructor(myenv: PrologPlusCG.prolog.PPCGEnv) {
            this.vctAscDescTyp1 = <any>([]);
            this.vctAscDescTyp2 = <any>([]);
            this.FirstSonFatherList1 = 0;
            this.LastSonFatherList1 = 0;
            this.FirstSonFatherList2 = 0;
            this.LastSonFatherList2 = 0;
            this.descendant = true;
            if (this.hierarchy === undefined) { this.hierarchy = null; }
            this.env = null;
            this.hierarchy = <any>({});
            this.env = myenv;
        }

        public createTypeHierarchy() {
            const pRules: PrologPlusCG.prolog.RuleVector = <PrologPlusCG.prolog.RuleVector>/* get */((m,k) => m[k]===undefined?null:m[k])(this.env.program, this.env.compile.valSysSP);
            let aRule: PrologPlusCG.prolog.PrologRule;
            let aTerm: PrologPlusCG.prolog.PrologTerm;
            let headTerm: PrologPlusCG.prolog.PrologTerm;
            let aPrologData: PrologPlusCG.prolog.PrologData;
            let idTypeHead: string;
            let identType: string;
            let vctIdents: Array<string>;
            let cpleVct2: PrologPlusCG.prolog.DataTypeVectorPair;
            for(let listElement: number = 0; listElement < pRules.size(); ++listElement) {{
                aRule = pRules.get(listElement);
                headTerm = <PrologPlusCG.prolog.PrologTerm>aRule.firstElement();
                aPrologData = headTerm.get(0);
                idTypeHead = <string>aPrologData.data;
                vctIdents = <any>([]);
                for(let listIndex: number = 0; listIndex < aRule.size(); ++listIndex) {{
                    aTerm = <PrologPlusCG.prolog.PrologTerm>aRule.get(listIndex);
                    aPrologData = aTerm.get(0);
                    identType = <string>aPrologData.data;
                    /* addElement */(vctIdents.push(identType)>0);
                    cpleVct2 = <PrologPlusCG.prolog.DataTypeVectorPair>this.get(identType);
                    if (cpleVct2 == null){
                        cpleVct2 = new PrologPlusCG.prolog.DataTypeVectorPair(null, <any>([]));
                        this.put(identType, cpleVct2);
                    }
                    /* addElement */(cpleVct2.vectFathers.push(idTypeHead)>0);
                };}
                cpleVct2 = <PrologPlusCG.prolog.DataTypeVectorPair>this.get(idTypeHead);
                if (cpleVct2 != null){
                    cpleVct2.vctSons = vctIdents;
                } else {
                    this.put(idTypeHead, new PrologPlusCG.prolog.DataTypeVectorPair(vctIdents, <any>([])));
                }
            };}
        }

        /*private*/ put(idTypeHead: string, dataTypeVectorPair: PrologPlusCG.prolog.DataTypeVectorPair) {
            /* put */(this.hierarchy[idTypeHead] = dataTypeVectorPair);
        }

        /*private*/ get(identType: string): PrologPlusCG.prolog.DataTypeVectorPair {
            return /* get */((m,k) => m[k]===undefined?null:m[k])(this.hierarchy, identType);
        }

        addInstance(Ref: string, identType: string) {
            if (this.get(identType) == null){
                throw new PrologPlusCG.prolog.ExecException("Error: " + identType + " is not a declared type.\n");
            }
            let pRules: PrologPlusCG.prolog.RuleVector = <PrologPlusCG.prolog.RuleVector>/* get */((m,k) => m[k]===undefined?null:m[k])(this.env.program, this.env.compile.valSysINST);
            let aRule: PrologPlusCG.prolog.PrologRule = null;
            if (pRules == null){
                pRules = new PrologPlusCG.prolog.RuleVector();
                /* put */(this.env.program[this.env.compile.valSysINST] = pRules);
            }
            let bFound: boolean = false;
            let aTerm: PrologPlusCG.prolog.PrologTerm = null;
            let id: string = null;
            for(let listIndex: number = 0; listIndex < pRules.size() && !bFound; ++listIndex) {{
                aRule = pRules.get(listIndex);
                aTerm = aRule.firstElement();
                id = <string>aTerm.getAt(0).data;
                if (id === identType){
                    bFound = true;
                }
            };}
            let typRef: number = 0;
            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(Ref, "\"")){
                typRef = PrologPlusCG.prolog.DataTypes.uString;
            } else {
                typRef = PrologPlusCG.prolog.DataTypes.uIdentifier;
            }
            const aPrologData: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(typRef, Ref);
            aTerm = new PrologPlusCG.prolog.PrologTerm();
            aTerm.addData(aPrologData);
            if (!bFound){
                aRule = new PrologPlusCG.prolog.PrologRule();
                const unTermTyp: PrologPlusCG.prolog.PrologTerm = new PrologPlusCG.prolog.PrologTerm();
                unTermTyp.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, identType));
                aRule.addTerm(unTermTyp);
                pRules.addRule(aRule);
            }
            aRule.addTerm(aTerm);
        }

        isInstanceOf(Ref: string, Typ: string): boolean {
            const pRules: PrologPlusCG.prolog.RuleVector = <PrologPlusCG.prolog.RuleVector>/* get */((m,k) => m[k]===undefined?null:m[k])(this.env.program, this.env.compile.valSysINST);
            if (pRules == null){
                throw new PrologPlusCG.prolog.ExecException("Error, instance rules are not specified.\n");
            }
            let typeRef: string = null;
            let aRule: PrologPlusCG.prolog.PrologRule;
            for(let listIndex: number = 0; listIndex < pRules.size() && (typeRef == null); ++listIndex) {{
                aRule = pRules.get(listIndex);
                let unTerme: PrologPlusCG.prolog.PrologTerm;
                for(let listIndex2: number = 0; listIndex2 < aRule.size(); ++listIndex2) {{
                    unTerme = aRule.get(listIndex2);
                    const id: string = <string>unTerme.getAt(0).data;
                    if (Ref === id){
                        const trmTmp: PrologPlusCG.prolog.PrologTerm = <PrologPlusCG.prolog.PrologTerm>aRule.firstElement();
                        typeRef = <string>trmTmp.getAt(0).data;
                    }
                };}
            };}
            if (typeRef == null){
                throw new PrologPlusCG.prolog.ExecException("Error : " + Ref + " is not declared as an instance of any type.\n");
            } else {
                return this.isSubType(typeRef, Typ);
            }
        }

        public isSubType(Type1: string, Type2: string): boolean {
            const Type3: string = this.maxComSubType(Type1, Type2);
            return Type3 === Type1;
        }

        public isSuperType(Type1: string, Type2: string): boolean {
            const Type3: string = this.minComSuperType(Type1, Type2);
            return Type3 === Type1;
        }

        immediateSubTypes(Type: string): PrologPlusCG.prolog.PrologData {
            return this.immediateSuccessors(Type, true);
        }

        immediateSuperTypes(Type: string): PrologPlusCG.prolog.PrologData {
            return this.immediateSuccessors(Type, false);
        }

        immediateSuccessors(Type: string, isFilsDir: boolean): PrologPlusCG.prolog.PrologData {
            let vctTypeSonsFathers: Array<string>;
            let cpleVctTypes: PrologPlusCG.prolog.DataTypeVectorPair;
            cpleVctTypes = <PrologPlusCG.prolog.DataTypeVectorPair>this.get(Type);
            if (cpleVctTypes == null){
                throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type + " is not specified in the type hierarchy.\n");
            }
            if (isFilsDir){
                vctTypeSonsFathers = cpleVctTypes.vctSons;
            } else {
                vctTypeSonsFathers = cpleVctTypes.vectFathers;
            }
            const uneListe: PrologPlusCG.prolog.PrologList = new PrologPlusCG.prolog.PrologList();
            if (vctTypeSonsFathers != null){
                let T: string = null;
                for(let listIndex3: number = 0; listIndex3 < /* size */(<number>vctTypeSonsFathers.length); ++listIndex3) {{
                    T = /* get */vctTypeSonsFathers[listIndex3];
                    uneListe.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, T));
                };}
            }
            return new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, uneListe);
        }

        subTypes(Type: string): PrologPlusCG.prolog.PrologData {
            return this.successor(Type, true);
        }

        superTypes(Type: string): PrologPlusCG.prolog.PrologData {
            return this.successor(Type, false);
        }

        successor(Type: string, isSonsDirection: boolean): PrologPlusCG.prolog.PrologData {
            const vctTypeDscds: Array<string> = <any>([]);
            if (this.get(Type) == null){
                throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type + " is not specified in the type hierarchy.\n");
            }
            /* addElement */(vctTypeDscds.push(Type)>0);
            let cpleVctTypes: PrologPlusCG.prolog.DataTypeVectorPair;
            let vctTypeSonsFathers: Array<string>;
            let currType: string;
            let type2: string;
            let tailleVctFsPr: number;
            for(let ind: number = 0; ind < /* size */(<number>vctTypeDscds.length); ind++) {{
                currType = <string>/* elementAt */vctTypeDscds[ind];
                cpleVctTypes = <PrologPlusCG.prolog.DataTypeVectorPair>this.get(currType);
                if (isSonsDirection){
                    vctTypeSonsFathers = cpleVctTypes.vctSons;
                } else {
                    vctTypeSonsFathers = cpleVctTypes.vectFathers;
                }
                if (vctTypeSonsFathers != null){
                    tailleVctFsPr = /* size */(<number>vctTypeSonsFathers.length);
                    for(let ind2: number = 0; ind2 < tailleVctFsPr; ind2++) {{
                        type2 = <string>/* elementAt */vctTypeSonsFathers[ind2];
                        let elemExist: boolean = false;
                        let T: string = null;
                        for(let listIndex4: number = 0; listIndex4 < /* size */(<number>vctTypeDscds.length) && !elemExist; ++listIndex4) {{
                            T = /* get */vctTypeDscds[listIndex4];
                            elemExist = T === type2;
                        };}
                        if (!elemExist){
                            /* addElement */(vctTypeDscds.push(type2)>0);
                        }
                    };}
                }
            };}
            /* removeElementAt */vctTypeDscds.splice(0, 1);
            const uneListe: PrologPlusCG.prolog.PrologList = new PrologPlusCG.prolog.PrologList();
            if (vctTypeDscds != null){
                let T: string = null;
                for(let listIndex5: number = 0; listIndex5 < /* size */(<number>vctTypeDscds.length); ++listIndex5) {{
                    T = /* get */vctTypeDscds[listIndex5];
                    uneListe.addData(new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uIdentifier, T));
                };}
            }
            return new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, uneListe);
        }

        public minComSuperType(Type1: string, Type2: string): string {
            if (!this.containsKey(Type1)){
                throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type1 + " is not specified in the type hierarchy.\n");
            }
            if (!this.containsKey(Type2)){
                throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type2 + " is not specified in the type hierarchy.\n");
            }
            this.descendant = false;
            /* clear */(this.vctAscDescTyp1.length = 0);
            /* addElement */(this.vctAscDescTyp1.push(new PrologPlusCG.prolog.IdentifierIndexPair(Type1, 0))>0);
            /* clear */(this.vctAscDescTyp2.length = 0);
            /* addElement */(this.vctAscDescTyp2.push(Type2)>0);
            this.FirstSonFatherList1 = this.LastSonFatherList1 = this.FirstSonFatherList2 = this.LastSonFatherList2 = 0;
            let bStop: boolean = false;
            let Type3: string = this.getTypeInCommon();
            while((!bStop && (Type3 == null))) {{
                if (!this.addNewSonsFathers1() && !this.addNewSonsFathers2()){
                    bStop = true;
                } else {
                    Type3 = this.getTypeInCommon();
                }
            }};
            if ((Type3 == null) || (Type3 === ("Universal")) || (Type3 === ("UNIVERSAL"))){
                return "Universal";
            } else {
                return Type3;
            }
        }

        /*private*/ containsKey(type1: string): boolean {
            return /* containsKey */this.hierarchy.hasOwnProperty(type1);
        }

        public minComSuperTypes(Type1: string, Type2: string): Array<string> {
            if (!this.containsKey(Type1)){
                throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type1 + " is not specified in the type hierarchy.\n");
            }
            if (!this.containsKey(Type2)){
                throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type2 + " is not specified in the type hierarchy.\n");
            }
            if (this.isSuperType(Type1, Type2)){
                const Types: Array<string> = <any>([]);
                /* add */(Types.push(Type1)>0);
                return Types;
            } else if (this.isSuperType(Type2, Type1)){
                const Types: Array<string> = <any>([]);
                /* add */(Types.push(Type2)>0);
                return Types;
            }
            this.descendant = false;
            /* clear */(this.vctAscDescTyp1.length = 0);
            /* addElement */(this.vctAscDescTyp1.push(new PrologPlusCG.prolog.IdentifierIndexPair(Type1, 0))>0);
            /* clear */(this.vctAscDescTyp2.length = 0);
            /* addElement */(this.vctAscDescTyp2.push(Type2)>0);
            this.FirstSonFatherList1 = this.LastSonFatherList1 = this.FirstSonFatherList2 = this.LastSonFatherList2 = 0;
            let bStop: boolean = false;
            while((!bStop)) {{
                if (!this.addNewSonsFathers1() && !this.addNewSonsFathers2()){
                    bStop = true;
                }
            }};
            const Types3: Array<string> = this.getMaxMinTypesInCommon();
            if ((Types3 == null) || ((<string>/* elementAt */Types3[0]).toUpperCase() === ("UNIVERSAL"))){
                const UniversalVector: Array<string> = <any>([]);
                /* add */(UniversalVector.push("Universal")>0);
                return UniversalVector;
            } else {
                return Types3;
            }
        }

        public maxComSubType(Type1: string, Type2: string): string {
            if (!this.containsKey(Type1)){
                throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type1 + " is not specified in the type hierarchy.\n");
            }
            if (!this.containsKey(Type2)){
                throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type2 + " is not specified in the type hierarchy.\n");
            }
            this.descendant = true;
            /* clear */(this.vctAscDescTyp1.length = 0);
            /* addElement */(this.vctAscDescTyp1.push(new PrologPlusCG.prolog.IdentifierIndexPair(Type1, 0))>0);
            /* clear */(this.vctAscDescTyp2.length = 0);
            /* addElement */(this.vctAscDescTyp2.push(Type2)>0);
            this.FirstSonFatherList1 = this.LastSonFatherList1 = this.FirstSonFatherList2 = this.LastSonFatherList2 = 0;
            let bStop: boolean = false;
            let Type3: string = this.getTypeInCommon();
            while((!bStop && (Type3 == null))) {{
                if (!this.addNewSonsFathers1() && !this.addNewSonsFathers2()){
                    bStop = true;
                } else {
                    Type3 = this.getTypeInCommon();
                }
            }};
            if ((Type3 == null) || (Type3 === ("Absurd"))){
                return "Absurd";
            } else {
                return Type3;
            }
        }

        public maxComSubTypes(Type1: string, Type2: string): Array<string> {
            if (!this.containsKey(Type1)){
                throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type1 + " is not specified in the type hierarchy.\n");
            }
            if (!this.containsKey(Type2)){
                throw new PrologPlusCG.prolog.ExecException("Error : The concept type " + Type2 + " is not specified in the type hierarchy.\n");
            }
            if (this.isSubType(Type1, Type2)){
                const Types: Array<string> = <any>([]);
                /* add */(Types.push(Type1)>0);
                return Types;
            } else if (this.isSubType(Type2, Type1)){
                const Types: Array<string> = <any>([]);
                /* add */(Types.push(Type2)>0);
                return Types;
            }
            this.descendant = true;
            /* clear */(this.vctAscDescTyp1.length = 0);
            /* addElement */(this.vctAscDescTyp1.push(new PrologPlusCG.prolog.IdentifierIndexPair(Type1, 0))>0);
            /* clear */(this.vctAscDescTyp2.length = 0);
            /* addElement */(this.vctAscDescTyp2.push(Type2)>0);
            this.FirstSonFatherList1 = this.LastSonFatherList1 = this.FirstSonFatherList2 = this.LastSonFatherList2 = 0;
            let bStop: boolean = false;
            while((!bStop)) {{
                if (!this.addNewSonsFathers1() && !this.addNewSonsFathers2()){
                    bStop = true;
                }
            }};
            const Types3: Array<string> = this.getMaxMinTypesInCommon();
            if ((Types3 == null) || ((<string>/* elementAt */Types3[0]).toUpperCase() === ("ABSURD"))){
                const AbsurdVector: Array<string> = <any>([]);
                /* add */(AbsurdVector.push("Absurd")>0);
                return AbsurdVector;
            } else {
                return Types3;
            }
        }

        public getTypeInCommon(): string {
            let Type3: string = null;
            let unIdInd: PrologPlusCG.prolog.IdentifierIndexPair;
            let id2: string;
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>this.vctAscDescTyp1.length) && (Type3 == null); ++listIndex1) {{
                unIdInd = /* get */this.vctAscDescTyp1[listIndex1];
                while(((unIdInd.index <= this.LastSonFatherList2) && (Type3 == null))) {{
                    id2 = <string>/* elementAt */this.vctAscDescTyp2[unIdInd.index];
                    if (id2 === unIdInd.idType){
                        Type3 = id2;
                    } else {
                        unIdInd.index++;
                    }
                }};
            };}
            return Type3;
        }

        public getMaxMinTypesInCommon(): Array<string> {
            let Types3: Array<string> = null;
            let unIdInd: PrologPlusCG.prolog.IdentifierIndexPair;
            let id2: string;
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>this.vctAscDescTyp1.length); ++listIndex1) {{
                unIdInd = /* get */this.vctAscDescTyp1[listIndex1];
                while(((unIdInd.index <= this.LastSonFatherList2))) {{
                    id2 = <string>/* elementAt */this.vctAscDescTyp2[unIdInd.index];
                    if (id2 === unIdInd.idType){
                        if (Types3 == null){
                            Types3 = <any>([]);
                        }
                        let bSonOrFatherWasFound: boolean = false;
                        try {
                            for(let listIndex2: number = 0; listIndex2 < /* size */(<number>Types3.length) && !bSonOrFatherWasFound; ++listIndex2) {{
                                const Types3Typ: string = /* get */Types3[listIndex2];
                                if (this.descendant){
                                    bSonOrFatherWasFound = this.isSubType(Types3Typ, id2);
                                } else {
                                    bSonOrFatherWasFound = this.isSuperType(Types3Typ, id2);
                                }
                            };}
                        } catch(exc) {
                        }
                        if (!bSonOrFatherWasFound){
                            /* add */(Types3.push(id2)>0);
                        }
                    }
                    unIdInd.index++;
                }};
            };}
            return Types3;
        }

        /*private*/ addNewSonsFathers1(): boolean {
            let bSomeWereAdded: boolean = true;
            let nIdIndex: PrologPlusCG.prolog.IdentifierIndexPair;
            let idSonFather: string;
            let vctTypeSonsFathers: Array<string>;
            let cpleVctTypes: PrologPlusCG.prolog.DataTypeVectorPair;
            while((this.FirstSonFatherList1 <= this.LastSonFatherList1)) {{
                nIdIndex = <PrologPlusCG.prolog.IdentifierIndexPair>/* elementAt */this.vctAscDescTyp1[this.FirstSonFatherList1];
                cpleVctTypes = <PrologPlusCG.prolog.DataTypeVectorPair>this.get(nIdIndex.idType);
                if (this.descendant){
                    vctTypeSonsFathers = cpleVctTypes.vctSons;
                } else {
                    vctTypeSonsFathers = cpleVctTypes.vectFathers;
                }
                if (vctTypeSonsFathers != null){
                    for(let listIndex1: number = 0; listIndex1 < /* size */(<number>vctTypeSonsFathers.length); ++listIndex1) {{
                        idSonFather = /* get */vctTypeSonsFathers[listIndex1];
                        /* addElement */(this.vctAscDescTyp1.push(new PrologPlusCG.prolog.IdentifierIndexPair(idSonFather, 0))>0);
                    };}
                }
                this.FirstSonFatherList1++;
            }};
            const Last: number = /* size */(<number>this.vctAscDescTyp1.length) - 1;
            if (this.LastSonFatherList1 === Last){
                bSomeWereAdded = false;
            } else {
                this.LastSonFatherList1 = Last;
            }
            return bSomeWereAdded;
        }

        /*private*/ addNewSonsFathers2(): boolean {
            let bSomeWereAdded: boolean = true;
            let strId: string;
            let idSonFather: string;
            let vctTypeSonsFathers: Array<string>;
            let cpleVctTypes: PrologPlusCG.prolog.DataTypeVectorPair;
            while((this.FirstSonFatherList2 <= this.LastSonFatherList2)) {{
                strId = <string>/* elementAt */this.vctAscDescTyp2[this.FirstSonFatherList2];
                cpleVctTypes = <PrologPlusCG.prolog.DataTypeVectorPair>this.get(strId);
                if (this.descendant){
                    vctTypeSonsFathers = cpleVctTypes.vctSons;
                } else {
                    vctTypeSonsFathers = cpleVctTypes.vectFathers;
                }
                if (vctTypeSonsFathers != null){
                    for(let listIndex2: number = 0; listIndex2 < /* size */(<number>vctTypeSonsFathers.length); ++listIndex2) {{
                        idSonFather = /* get */vctTypeSonsFathers[listIndex2];
                        /* addElement */(this.vctAscDescTyp2.push(idSonFather)>0);
                    };}
                }
                this.FirstSonFatherList2++;
            }};
            const Last: number = /* size */(<number>this.vctAscDescTyp2.length) - 1;
            if (this.LastSonFatherList2 === Last){
                bSomeWereAdded = false;
            } else {
                this.LastSonFatherList2 = Last;
            }
            return bSomeWereAdded;
        }

        public clear() {
            /* clear */(obj => { for (let member in obj) delete obj[member]; })(this.hierarchy);
        }
    }
    TypeHierarchy["__class"] = "PrologPlusCG.prolog.TypeHierarchy";
    TypeHierarchy["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];


}
namespace PrologPlusCG.prolog {
    export class Unification implements PrologPlusCG.prolog.DataTypes {
        public Unif_Stack: PrologPlusCG.prolog.UnificationStack;

        bUnifyCurCG: boolean;

        vctConstraints: Array<PrologPlusCG.prolog.Constraint>;

        /*private*/ indexList1: number;

        /*private*/ env: PrologPlusCG.prolog.PPCGEnv;

        public constructor(myenv: PrologPlusCG.prolog.PPCGEnv) {
            this.Unif_Stack = new PrologPlusCG.prolog.UnificationStack();
            this.bUnifyCurCG = false;
            this.vctConstraints = <any>([]);
            if (this.indexList1 === undefined) { this.indexList1 = 0; }
            if (this.env === undefined) { this.env = null; }
            this.env = myenv;
        }

        makeEmpty_vctContstraints() {
            let aConstraint: PrologPlusCG.prolog.Constraint;
            for(let listIndex: number = 0; listIndex < /* size */(<number>this.vctConstraints.length); ++listIndex) {{
                aConstraint = /* get */this.vctConstraints[listIndex];
                aConstraint.myDestroy();
            };}
            /* clear */(this.vctConstraints.length = 0);
        }

        removeConstraints() {
            let aConstraint: PrologPlusCG.prolog.Constraint;
            for(let listIndex: number = 0; listIndex < /* size */(<number>this.vctConstraints.length); ++listIndex) {{
                aConstraint = /* get */this.vctConstraints[listIndex];
                if (aConstraint.m_LeftData == null){
                    this.removeConstraintValue(<string>aConstraint.m_RightData, aConstraint.m_levelOfRightData);
                } else if (aConstraint.m_RightData == null){
                    this.removeConstraintValue(<string>aConstraint.m_LeftData, aConstraint.m_levelOfLeftData);
                } else {
                    this.Unif_Stack.removeVariable(<string>aConstraint.m_LeftData, aConstraint.m_levelOfLeftData, <string>aConstraint.m_RightData, aConstraint.m_levelOfRightData);
                    this.Unif_Stack.removeVariable(<string>aConstraint.m_RightData, aConstraint.m_levelOfRightData, <string>aConstraint.m_LeftData, aConstraint.m_levelOfLeftData);
                }
                aConstraint.myDestroy();
            };}
            /* clear */(this.vctConstraints.length = 0);
        }

        unify(pLeftData: PrologPlusCG.prolog.PrologData, indexOfLeftData: number, pRightData: PrologPlusCG.prolog.PrologData, indexOfRightData: number): boolean {
            if (this.isAnonymousVariable(pLeftData) || this.isAnonymousVariable(pRightData)){
                return true;
            }
            let unifiable: boolean = true;
            let valueIndexLeft: PrologPlusCG.prolog.PrologDataIndexPair = this.valueFromUnifStack(pLeftData, indexOfLeftData);
            let valueIndexRight: PrologPlusCG.prolog.PrologDataIndexPair = this.valueFromUnifStack(pRightData, indexOfRightData);
            if ((valueIndexLeft.pData == null) && (valueIndexRight.pData != null)){
                this.addConstraint2(valueIndexRight.pData, valueIndexRight.index, <string>pLeftData.data, indexOfLeftData);
            } else if ((valueIndexLeft.pData != null) && (valueIndexRight.pData == null)){
                this.addConstraint2(valueIndexLeft.pData, valueIndexLeft.index, <string>pRightData.data, indexOfRightData);
            } else if ((valueIndexLeft.pData == null) && (valueIndexRight.pData == null)){
                this.addConstraint3(<string>pLeftData.data, indexOfLeftData, <string>pRightData.data, indexOfRightData);
            } else if ((valueIndexLeft.pData.typeOfData !== valueIndexRight.pData.typeOfData) && (((valueIndexLeft.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uCG) && (valueIndexLeft.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uConcept)) || ((valueIndexRight.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uCG) && (valueIndexRight.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uConcept)))){
                unifiable = false;
            } else {
                let pData1Left: any;
                let pData1Right: any;
                pData1Left = valueIndexLeft.pData.data;
                pData1Right = valueIndexRight.pData.data;
                if (pData1Left === pData1Right){
                    return true;
                }
                switch((valueIndexLeft.pData.typeOfData)) {
                case 0 /* uNumber */:
                    {
                        let tmp1Left: number = <number>pData1Left;
                        let tmp1Right: number = <number>pData1Right;
                        unifiable = (/* doubleValue */tmp1Left === /* doubleValue */tmp1Right);
                        tmp1Left = tmp1Right = null;
                    };
                    break;
                case 1 /* uBoolean */:
                    {
                        let tmp1Left: boolean = <boolean>pData1Left;
                        let tmp1Right: boolean = <boolean>pData1Right;
                        unifiable = (/* booleanValue */tmp1Left === /* booleanValue */tmp1Right);
                        tmp1Left = tmp1Right = null;
                    };
                    break;
                case 2 /* uIdentifier */:
                case 3 /* uString */:
                    {
                        let strData1: string = <string>pData1Left;
                        let strData2: string = <string>pData1Right;
                        unifiable = strData1 === strData2;
                        strData1 = strData2 = null;
                    };
                    break;
                case 44 /* uSet */:
                    {
                        let pList1: PrologPlusCG.prolog.PrologList = <PrologPlusCG.prolog.PrologList>pData1Left;
                        let pList2: PrologPlusCG.prolog.PrologList = <PrologPlusCG.prolog.PrologList>pData1Right;
                        unifiable = this.env.compile.set1IsSubsetOfSet2(pList1, pList2);
                        pList1 = pList2 = null;
                    };
                    break;
                case 13 /* uList */:
                    {
                        let pList1: PrologPlusCG.prolog.PrologList = <PrologPlusCG.prolog.PrologList>pData1Left;
                        let pList2: PrologPlusCG.prolog.PrologList = <PrologPlusCG.prolog.PrologList>pData1Right;
                        this.indexList1 = 0;
                        let indexList2: number = 0;
                        const indexLastElemList1: number = pList1.size() - 1;
                        const indexLastElemList2: number = pList2.size() - 1;
                        let bStop: boolean = false;
                        while((unifiable && (!bStop) && (this.indexList1 <= indexLastElemList1) && (indexList2 <= indexLastElemList2))) {{
                            if (((((<PrologPlusCG.prolog.PrologData>pList1.elementAt(this.indexList1)).typeOfData) !== PrologPlusCG.prolog.DataTypes.uVarList) && (((<PrologPlusCG.prolog.PrologData>pList2.elementAt(indexList2)).typeOfData) !== PrologPlusCG.prolog.DataTypes.uVarList)) || ((((<PrologPlusCG.prolog.PrologData>pList1.elementAt(this.indexList1)).typeOfData) === PrologPlusCG.prolog.DataTypes.uVarList) && (((<PrologPlusCG.prolog.PrologData>pList2.elementAt(indexList2)).typeOfData) === PrologPlusCG.prolog.DataTypes.uVarList))){
                                unifiable = this.unify((<PrologPlusCG.prolog.PrologData>pList1.elementAt(this.indexList1)), valueIndexLeft.index, (<PrologPlusCG.prolog.PrologData>pList2.elementAt(indexList2)), valueIndexRight.index);
                                this.indexList1++;
                                indexList2++;
                            } else if (((<PrologPlusCG.prolog.PrologData>pList1.elementAt(this.indexList1)).typeOfData) === PrologPlusCG.prolog.DataTypes.uVarList){
                                let data1Left: PrologPlusCG.prolog.PrologData = <PrologPlusCG.prolog.PrologData>pList1.elementAt(this.indexList1);
                                let listCopy: PrologPlusCG.prolog.PrologList = this.copyList(pList2, indexList2);
                                let data1Right: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, listCopy);
                                unifiable = this.unify(data1Left, valueIndexLeft.index, data1Right, valueIndexRight.index);
                                data1Left = data1Right = null;
                                listCopy = null;
                                bStop = true;
                            } else {
                                const listCopy: PrologPlusCG.prolog.PrologList = this.copyList(pList1, this.indexList1);
                                let data1Left: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, listCopy);
                                let data1Right: PrologPlusCG.prolog.PrologData = <PrologPlusCG.prolog.PrologData>pList2.elementAt(indexList2);
                                unifiable = this.unify(data1Left, valueIndexLeft.index, data1Right, valueIndexRight.index);
                                data1Left = data1Right = null;
                                bStop = true;
                            }
                        }};
                        if (unifiable && (!bStop)){
                            if (this.indexList1 <= indexLastElemList1){
                                if (((<PrologPlusCG.prolog.PrologData>pList1.elementAt(this.indexList1)).typeOfData) === PrologPlusCG.prolog.DataTypes.uVarList){
                                    let data1Left: PrologPlusCG.prolog.PrologData = <PrologPlusCG.prolog.PrologData>pList1.elementAt(this.indexList1);
                                    let listCopy: PrologPlusCG.prolog.PrologList = new PrologPlusCG.prolog.PrologList();
                                    let data1Right: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, listCopy);
                                    unifiable = this.unify(data1Left, valueIndexLeft.index, data1Right, valueIndexRight.index);
                                    data1Left = data1Right = null;
                                    listCopy = null;
                                    bStop = true;
                                } else {
                                    unifiable = false;
                                }
                            } else if (indexList2 <= indexLastElemList2){
                                if (((<PrologPlusCG.prolog.PrologData>pList2.elementAt(indexList2)).typeOfData) === PrologPlusCG.prolog.DataTypes.uVarList){
                                    const listCopy: PrologPlusCG.prolog.PrologList = new PrologPlusCG.prolog.PrologList();
                                    let data1Left: PrologPlusCG.prolog.PrologData = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uList, listCopy);
                                    let data1Right: PrologPlusCG.prolog.PrologData = <PrologPlusCG.prolog.PrologData>pList2.elementAt(indexList2);
                                    unifiable = this.unify(data1Left, valueIndexLeft.index, data1Right, valueIndexRight.index);
                                    data1Left = data1Right = null;
                                    bStop = true;
                                } else {
                                    unifiable = false;
                                }
                            }
                        }
                        if (!unifiable || !(bStop || ((this.indexList1 > indexLastElemList1) && (indexList2 > indexLastElemList2)))){
                            unifiable = false;
                        }
                        pList1 = pList2 = null;
                    };
                    break;
                case 11 /* uTerm */:
                    {
                        let pTerm1: PrologPlusCG.prolog.PrologTerm = <PrologPlusCG.prolog.PrologTerm>pData1Left;
                        let pTerm2: PrologPlusCG.prolog.PrologTerm = <PrologPlusCG.prolog.PrologTerm>pData1Right;
                        const tailleTerm1: number = pTerm1.size();
                        const tailleTerm2: number = pTerm2.size();
                        unifiable = (tailleTerm1 === tailleTerm2);
                        for(let i: number = 0; (unifiable && (i < tailleTerm1)); i++) {{
                            unifiable = this.unify(<PrologPlusCG.prolog.PrologData>pTerm1.elementAt(i), valueIndexLeft.index, <PrologPlusCG.prolog.PrologData>pTerm2.elementAt(i), valueIndexRight.index);
                        };}
                        pTerm1 = pTerm2 = null;
                    };
                    break;
                case 37 /* uConcept */:
                    {
                        if (valueIndexRight.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uCG){
                            const gTmp: PrologPlusCG.cg.CG = new PrologPlusCG.cg.CG();
                            gTmp.addConcept(<PrologPlusCG.cg.Concept>pData1Left);
                            this.bUnifyCurCG = true;
                            const uneUnifCG: PrologPlusCG.prolog.UnifyCG = new PrologPlusCG.prolog.UnifyCG(this.env);
                            try {
                                unifiable = uneUnifCG.UnifyGC(<PrologPlusCG.cg.CG>pData1Right, valueIndexRight.index, gTmp, valueIndexLeft.index);
                            } catch(excConform) {
                                this.env.recordErrorMessage(excConform.message);
                                unifiable = false;
                            }
                            this.bUnifyCurCG = false;
                        } else {
                            const aUnifyCG: PrologPlusCG.prolog.UnifyCG = new PrologPlusCG.prolog.UnifyCG(this.env);
                            try {
                                unifiable = aUnifyCG.UnifyConc(<PrologPlusCG.cg.Concept>pData1Left, <PrologPlusCG.cg.Concept>pData1Right, valueIndexLeft.index, valueIndexRight.index);
                            } catch(excConform) {
                                this.env.recordErrorMessage(excConform.message);
                                unifiable = false;
                            }
                        }
                    };
                    break;
                case 14 /* uCG */:
                    {
                        if (valueIndexRight.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uConcept){
                            const gTmp: PrologPlusCG.cg.CG = new PrologPlusCG.cg.CG();
                            gTmp.addConcept(<PrologPlusCG.cg.Concept>pData1Right);
                            this.bUnifyCurCG = true;
                            const uneUnifCG: PrologPlusCG.prolog.UnifyCG = new PrologPlusCG.prolog.UnifyCG(this.env);
                            try {
                                unifiable = uneUnifCG.UnifyGC(gTmp, valueIndexRight.index, <PrologPlusCG.cg.CG>pData1Left, valueIndexLeft.index);
                            } catch(excConform) {
                                this.env.recordErrorMessage(excConform.message);
                                unifiable = false;
                            }
                            this.bUnifyCurCG = false;
                        } else {
                            this.bUnifyCurCG = true;
                            const uneUnifCG: PrologPlusCG.prolog.UnifyCG = new PrologPlusCG.prolog.UnifyCG(this.env);
                            try {
                                unifiable = uneUnifCG.UnifyGC(<PrologPlusCG.cg.CG>pData1Right, valueIndexRight.index, <PrologPlusCG.cg.CG>pData1Left, valueIndexLeft.index);
                            } catch(excConform) {
                                this.env.recordErrorMessage(excConform.message);
                                unifiable = false;
                            }
                            this.bUnifyCurCG = false;
                        }
                    };
                    break;
                default:
                    throw new PrologPlusCG.prolog.ExecException("Error : an attempt to unify no pure Prolog+CG data; like Java objects. ");
                }
                pData1Left = pData1Right = null;
            }
            valueIndexLeft = valueIndexRight = null;
            return (unifiable);
        }

        copyList(pList: PrologPlusCG.prolog.PrologList, startIndex: number): PrologPlusCG.prolog.PrologList {
            const newList: PrologPlusCG.prolog.PrologList = new PrologPlusCG.prolog.PrologList();
            const numberOfElementsToRead: number = pList.size() - startIndex;
            for(let Ind: number = 0; Ind < numberOfElementsToRead; Ind++) {{
                newList.addElement(pList.elementAt(startIndex + Ind));
            };}
            return newList;
        }

        public valueFromUnifStack(pData: PrologPlusCG.prolog.PrologData, level: number): PrologPlusCG.prolog.PrologDataIndexPair {
            if ((pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uVariable) && (pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uVarList)){
                return (new PrologPlusCG.prolog.PrologDataIndexPair(pData, level));
            } else {
                const recUnif: PrologPlusCG.prolog.UnificationRecord = <PrologPlusCG.prolog.UnificationRecord>this.Unif_Stack.get(level);
                const lstContr: PrologPlusCG.prolog.VariableIndexPairList = recUnif.get(<string>pData.data);
                if ((lstContr != null) && (lstContr.ValInd != null)){
                    return lstContr.ValInd;
                } else {
                    return (new PrologPlusCG.prolog.PrologDataIndexPair(null, 0));
                }
            }
        }

        addConstraint3(pVarGch: string, indVarGch: number, pVarDrt: string, indVarDrt: number) {
            this.addVariableConstraint(pVarGch, indVarGch, pVarDrt, indVarDrt);
            this.addVariableConstraint(pVarDrt, indVarDrt, pVarGch, indVarGch);
            if (this.bUnifyCurCG){
                /* addElement */(this.vctConstraints.push(new PrologPlusCG.prolog.Constraint(pVarGch, indVarGch, pVarDrt, indVarDrt))>0);
            }
        }

        addVariableConstraint(pVarFcs: string, indVarFcs: number, pVarAtr: string, indVarAtr: number) {
            const recUnif: PrologPlusCG.prolog.UnificationRecord = <PrologPlusCG.prolog.UnificationRecord>this.Unif_Stack.elementAt(indVarFcs);
            let pCLContr: PrologPlusCG.prolog.VariableIndexPairList = <PrologPlusCG.prolog.VariableIndexPairList>recUnif.get(pVarFcs);
            if (pCLContr == null){
                pCLContr = new PrologPlusCG.prolog.VariableIndexPairList();
                pCLContr.addElement(new PrologPlusCG.prolog.VariableIndexPair(pVarAtr, indVarAtr));
                recUnif.put(pVarFcs, pCLContr);
                return;
            }
            let bFound: boolean = false;
            let VarInd: PrologPlusCG.prolog.VariableIndexPair;
            for(let listIndex: number = 0; listIndex < pCLContr.size() && !bFound; ++listIndex) {{
                VarInd = pCLContr.get(listIndex);
                if (VarInd.idVariable == null){
                    bFound = true;
                    VarInd.idVariable = pVarAtr;
                    VarInd.index = indVarAtr;
                }
            };}
            if (!bFound){
                pCLContr.addElement(new PrologPlusCG.prolog.VariableIndexPair(pVarAtr, indVarAtr));
            }
        }

        removeConstraintValue(idVar: string, nivVar: number) {
            const recUnif: PrologPlusCG.prolog.UnificationRecord = <PrologPlusCG.prolog.UnificationRecord>this.Unif_Stack.elementAt(nivVar);
            const pCLContr: PrologPlusCG.prolog.VariableIndexPairList = <PrologPlusCG.prolog.VariableIndexPairList>recUnif.get(idVar);
            pCLContr.ValInd.pData = null;
        }

        addConstraint2(pVal: PrologPlusCG.prolog.PrologData, nivVal: number, pVar: string, nivVar: number) {
            if (pVal.typeOfData === PrologPlusCG.prolog.DataTypes.uList){
                const uneList: PrologPlusCG.prolog.PrologList = <PrologPlusCG.prolog.PrologList>pVal.data;
                let uneDonTmp: PrologPlusCG.prolog.PrologData = null;
                try {
                    uneDonTmp = <PrologPlusCG.prolog.PrologData>uneList.lastElement();
                } catch(nsex) {
                }
                if ((uneDonTmp != null) && (uneDonTmp.typeOfData === PrologPlusCG.prolog.DataTypes.uVarList)){
                    const ValVarList: PrologPlusCG.prolog.PrologDataIndexPair = this.valueFromUnifStack(uneDonTmp, nivVal);
                    if ((ValVarList.pData != null) && (ValVarList.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uList)){
                        throw new PrologPlusCG.prolog.ExecException("The value of the variable after | should be a list.\n");
                    }
                }
            }
            let recUnif: PrologPlusCG.prolog.UnificationRecord = this.Unif_Stack.getTop();
            let pCLContr: PrologPlusCG.prolog.VariableIndexPairList = new PrologPlusCG.prolog.VariableIndexPairList();
            pCLContr.ValInd = new PrologPlusCG.prolog.PrologDataIndexPair(pVal, nivVal);
            recUnif.put(/* toString */(''+(this.env.aResolution.cptVarBid)), pCLContr);
            this.env.aResolution.cptVarBid++;
            this.propagateValue(pVar, nivVar, pCLContr.ValInd);
            recUnif = null;
            pCLContr = null;
            if (this.bUnifyCurCG){
                /* addElement */(this.vctConstraints.push(new PrologPlusCG.prolog.Constraint(null, nivVal, pVar, nivVar))>0);
            }
        }

        propagateValue(pVar: string, levelOfVar: number, contrVal: PrologPlusCG.prolog.PrologDataIndexPair) {
            if (pVar == null){
                return;
            }
            let recUnif: PrologPlusCG.prolog.UnificationRecord = <PrologPlusCG.prolog.UnificationRecord>this.Unif_Stack.elementAt(levelOfVar);
            let pCLContr: PrologPlusCG.prolog.VariableIndexPairList = <PrologPlusCG.prolog.VariableIndexPairList>recUnif.get(pVar);
            if (pCLContr != null){
                if ((pCLContr.ValInd == null) || (pCLContr.ValInd.pData == null)){
                    pCLContr.ValInd = contrVal;
                    let VarInd: PrologPlusCG.prolog.VariableIndexPair;
                    for(let listIndex2: number = 0; listIndex2 < pCLContr.size(); ++listIndex2) {{
                        VarInd = pCLContr.get(listIndex2);
                        this.propagateValue(VarInd.idVariable, VarInd.index, contrVal);
                    };}
                    VarInd = null;
                }
            } else {
                pCLContr = new PrologPlusCG.prolog.VariableIndexPairList();
                pCLContr.ValInd = contrVal;
                recUnif.put(pVar, pCLContr);
            }
            recUnif = null;
            pCLContr = null;
        }

        isAnonymousVariable(pDon: PrologPlusCG.prolog.PrologData): boolean {
            if ((pDon != null) && ((pDon.typeOfData === PrologPlusCG.prolog.DataTypes.uVariable) || (pDon.typeOfData === PrologPlusCG.prolog.DataTypes.uVarList))){
                return ((<string>pDon.data) === ("_"));
            } else {
                return false;
            }
        }
    }
    Unification["__class"] = "PrologPlusCG.prolog.Unification";
    Unification["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];


}
namespace PrologPlusCG.prolog {
    export class UnificationRecord {
        record: any;

        constructor() {
            if (this.record === undefined) { this.record = null; }
            this.record = <any>({});
        }

        public get(key: string): PrologPlusCG.prolog.VariableIndexPairList {
            return /* get */((m,k) => m[k]===undefined?null:m[k])(this.record, key);
        }

        public put(key: string, value: PrologPlusCG.prolog.VariableIndexPairList) {
            /* put */(this.record[key] = value);
        }

        public keys(): Array<string> {
            const result: Array<string> = <any>([]);
            const keys: Array<string> = /* keySet */Object.keys(this.record);
            for(let index = 0; index < keys.length; index++) {
                let key = keys[index];
                {
                    /* add */(result.push(key)>0);
                }
            }
            return result;
        }

        public isEmpty(): boolean {
            return /* isEmpty */(Object.keys(this.record).length == 0);
        }

        public clear() {
            /* clear */(obj => { for (let member in obj) delete obj[member]; })(this.record);
        }
    }
    UnificationRecord["__class"] = "PrologPlusCG.prolog.UnificationRecord";

}
namespace PrologPlusCG.prolog {
    export class UnificationStack {
        vec: Array<PrologPlusCG.prolog.UnificationRecord>;

        constructor() {
            if (this.vec === undefined) { this.vec = null; }
            this.vec = <any>([]);
        }

        public indexOfTop(): number {
            return (/* size */(<number>this.vec.length) - 1);
        }

        public push(recUnif: PrologPlusCG.prolog.UnificationRecord) {
            /* add */(this.vec.push(recUnif)>0);
        }

        public pushEmptyRecord() {
            this.push(new PrologPlusCG.prolog.UnificationRecord());
        }

        public pop(): PrologPlusCG.prolog.UnificationRecord {
            const recUnif: PrologPlusCG.prolog.UnificationRecord = this.getTop();
            let pCLContr: PrologPlusCG.prolog.VariableIndexPairList;
            let strVar: string;
            const recUnifKeys: Array<string> = recUnif.keys();
            for(let listIndex: number = 0; listIndex < /* size */(<number>recUnifKeys.length); ++listIndex) {{
                strVar = /* get */recUnifKeys[listIndex];
                pCLContr = <PrologPlusCG.prolog.VariableIndexPairList>recUnif.get(strVar);
                if (pCLContr.ValInd != null){
                    pCLContr.ValInd.pData = null;
                }
                let VarInd: PrologPlusCG.prolog.VariableIndexPair;
                for(let listIndex2: number = 0; listIndex2 < pCLContr.size(); ++listIndex2) {{
                    VarInd = pCLContr.get(listIndex2);
                    this.removeVariable(VarInd.idVariable, VarInd.index, strVar, this.indexOfTop());
                    VarInd.idVariable = null;
                };}
                VarInd = null;
                pCLContr.clear();
            };}
            pCLContr = null;
            strVar = null;
            recUnif.clear();
            /* remove */this.vec.splice(/* size */(<number>this.vec.length) - 1, 1)[0];
            return recUnif;
        }

        public lastElement(): PrologPlusCG.prolog.UnificationRecord {
            return /* get */this.vec[/* size */(<number>this.vec.length) - 1];
        }

        public getTop(): PrologPlusCG.prolog.UnificationRecord {
            return <PrologPlusCG.prolog.UnificationRecord>this.lastElement();
        }

        public makeEmpty() {
            /* clear */(this.vec.length = 0);
        }

        public get(index: number): PrologPlusCG.prolog.UnificationRecord {
            return /* get */this.vec[index];
        }

        public elementAt(index: number): PrologPlusCG.prolog.UnificationRecord {
            return /* get */this.vec[index];
        }

        public removeVariable(sVar: string, niv: number, sVarAtr: string, nivVarAtr: number) {
            if (sVar == null){
                return;
            }
            const recUnif: PrologPlusCG.prolog.UnificationRecord = /* get */this.vec[niv];
            const pCLContr: PrologPlusCG.prolog.VariableIndexPairList = <PrologPlusCG.prolog.VariableIndexPairList>recUnif.get(sVar);
            let bFound: boolean = false;
            let VarInd: PrologPlusCG.prolog.VariableIndexPair;
            for(let listIndex2: number = 0; listIndex2 < pCLContr.size() && !bFound; ++listIndex2) {{
                VarInd = pCLContr.get(listIndex2);
                if ((VarInd.idVariable === sVarAtr) && (VarInd.index === nivVarAtr)){
                    bFound = true;
                    VarInd.idVariable = null;
                }
            };}
        }
    }
    UnificationStack["__class"] = "PrologPlusCG.prolog.UnificationStack";

}
namespace PrologPlusCG.prolog {
    export class UnifyCG implements PrologPlusCG.prolog.DataTypes {
        e_inComeBranch: number;

        e_outComeBranch: number;

        CMatchL: Array<PrologPlusCG.prolog.ConceptUnification>;

        RMatchL: Array<PrologPlusCG.prolog.RelationUnification>;

        /*private*/ env: PrologPlusCG.prolog.PPCGEnv;

        public constructor(myenv: PrologPlusCG.prolog.PPCGEnv) {
            this.e_inComeBranch = 0;
            this.e_outComeBranch = 1;
            if (this.CMatchL === undefined) { this.CMatchL = null; }
            if (this.RMatchL === undefined) { this.RMatchL = null; }
            this.env = null;
            this.env = myenv;
            this.CMatchL = <any>([]);
            this.RMatchL = <any>([]);
        }

        CMatchL_MakeEmpty() {
            let aCMatch: PrologPlusCG.prolog.ConceptUnification;
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>this.CMatchL.length); listIndex1++) {{
                aCMatch = /* get */this.CMatchL[listIndex1];
                aCMatch.myDestroy();
            };}
            /* clear */(this.CMatchL.length = 0);
        }

        RMatchL_MakeEmpty() {
            let aRMatch: PrologPlusCG.prolog.RelationUnification;
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>this.RMatchL.length); ++listIndex1) {{
                aRMatch = /* get */this.RMatchL[listIndex1];
                aRMatch.myDestroy();
            };}
            /* clear */(this.RMatchL.length = 0);
        }

        sameNameRel(pDataLeft: PrologPlusCG.prolog.PrologData, pDataRight: PrologPlusCG.prolog.PrologData, indexLeft: number, indexRight: number): boolean {
            const valIndexLeft: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pDataLeft, indexLeft);
            const valIndexRight: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pDataRight, indexRight);
            let bResult: boolean = true;
            if ((valIndexLeft.pData == null) && (valIndexRight.pData != null)){
                this.env.unification.addConstraint2(valIndexRight.pData, valIndexRight.index, <string>pDataLeft.data, indexLeft);
            } else if ((valIndexLeft.pData != null) && (valIndexRight.pData == null)){
                this.env.unification.addConstraint2(valIndexLeft.pData, valIndexLeft.index, <string>pDataRight.data, indexRight);
            } else if ((valIndexLeft.pData == null) && (valIndexRight.pData == null)){
                this.env.unification.addConstraint3(<string>pDataLeft.data, indexLeft, <string>pDataRight.data, indexRight);
            } else {
                let pData1Left: any;
                let pData1Right: any;
                pData1Left = valIndexLeft.pData.data;
                pData1Right = valIndexRight.pData.data;
                const strData1: string = <string>pData1Left;
                const strData2: string = <string>pData1Right;
                bResult = strData1 === strData2;
            }
            return bResult;
        }

        UnifyGC(G1: PrologPlusCG.cg.CG, nivG1: number, G2: PrologPlusCG.cg.CG, nivG2: number): boolean {
            let BRes: boolean = false;
            if ((/* size */(<number>G1.m_vctRelations.length) > /* size */(<number>G2.m_vctRelations.length)) || !this.bagInclusion(G1.m_vctRelations, G2.m_vctRelations, nivG1, nivG2)){
                BRes = false;
            } else {
                BRes = this.computeEntryPointsAndUnify(G1, nivG1, G2, nivG2);
            }
            this.env.unification.makeEmpty_vctContstraints();
            return BRes;
        }

        bagInclusion(lr1: Array<PrologPlusCG.cg.Relation>, lr2: Array<PrologPlusCG.cg.Relation>, nivG1: number, nivG2: number): boolean {
            let lst: Array<PrologPlusCG.cg.Relation> = <any>([]);
            let rla1: PrologPlusCG.cg.Relation = null;
            let rla2: PrologPlusCG.cg.Relation = null;
            let bFound: boolean;
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>lr1.length); ++listIndex1) {{
                rla1 = /* get */lr1[listIndex1];
                bFound = false;
                for(let listIndex2: number = 0; listIndex2 < /* size */(<number>lr2.length) && !bFound; ++listIndex2) {{
                    rla2 = /* get */lr2[listIndex2];
                    if (this.sameNameRel(rla1.m_pdRelationName, rla2.m_pdRelationName, nivG1, nivG2) && !/* contains */(lst.indexOf(<any>(rla2)) >= 0)){
                        bFound = true;
                    }
                };}
                if (bFound){
                    /* addElement */(lst.push(rla2)>0);
                } else {
                    /* clear */(lst.length = 0);
                    lst = null;
                    return false;
                }
            };}
            /* clear */(lst.length = 0);
            lst = null;
            return true;
        }

        computeEntryPointsAndUnify(G1: PrologPlusCG.cg.CG, levelG1: number, G2: PrologPlusCG.cg.CG, levelG2: number): boolean {
            let bResult: boolean = false;
            let C1: PrologPlusCG.cg.Concept;
            let C2: PrologPlusCG.cg.Concept;
            if ((/* size */(<number>G1.m_vctConcepts.length) === 1) && /* isEmpty */(G1.m_vctRelations.length == 0)){
                C1 = <PrologPlusCG.cg.Concept>/* get */G1.m_vctConcepts[0];
                for(let listIndex: number = 0; listIndex < /* size */(<number>G2.m_vctConcepts.length) && !bResult; listIndex++) {{
                    C2 = /* get */G2.m_vctConcepts[listIndex];
                    bResult = this.UnifyConcept(C1, C2, levelG1, levelG2);
                    if (!bResult){
                        this.env.unification.removeConstraints();
                    }
                };}
            } else {
                let vConcs: Array<PrologPlusCG.cg.Concept> = <any>([]);
                if (this.identRef(G1, levelG1, G2, levelG2, vConcs)){
                    C1 = <PrologPlusCG.cg.Concept>/* get */vConcs[0];
                    C2 = <PrologPlusCG.cg.Concept>/* elementAt */vConcs[1];
                    bResult = this.unifyWithBack(C1, C2, null, null, G1, levelG1, levelG2);
                    /* clear */(vConcs.length = 0);
                    vConcs = null;
                } else {
                    /* clear */(vConcs.length = 0);
                    const rl1: PrologPlusCG.cg.Relation = <PrologPlusCG.cg.Relation>/* get */G1.m_vctRelations[0];
                    let rl2: PrologPlusCG.cg.Relation;
                    for(let listIndex2: number = 0; listIndex2 < /* size */(<number>G2.m_vctRelations.length) && !bResult; listIndex2++) {{
                        rl2 = /* get */G2.m_vctRelations[listIndex2];
                        if (this.sameNameRel(rl1.m_pdRelationName, rl2.m_pdRelationName, levelG1, levelG2)){
                            bResult = this.unifyWithBack(rl1.m_concSource, rl2.m_concSource, rl1.m_concDestination, rl2.m_concDestination, G1, levelG1, levelG2);
                        }
                    };}
                }
            }
            this.CMatchL_MakeEmpty();
            this.RMatchL_MakeEmpty();
            return bResult;
        }

        public identRef(G1: PrologPlusCG.cg.CG, nivG1: number, G2: PrologPlusCG.cg.CG, nivG2: number, vConcs: Array<PrologPlusCG.cg.Concept>): boolean {
            let C1: PrologPlusCG.cg.Concept = null;
            let C2: PrologPlusCG.cg.Concept = null;
            let sRef1: string;
            let sRef2: any;
            let bResult: boolean = false;
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>G1.m_vctConcepts.length) && !bResult; ++listIndex1) {{
                C1 = /* get */G1.m_vctConcepts[listIndex1];
                sRef1 = this.individu(C1.m_pdReferent, nivG1);
                if (sRef1 != null){
                    for(let listIndex2: number = 0; listIndex2 < /* size */(<number>G2.m_vctConcepts.length) && !bResult; ++listIndex2) {{
                        C2 = /* get */G2.m_vctConcepts[listIndex2];
                        sRef2 = this.individu2(C2.m_pdReferent, nivG2);
                        if ((sRef2 != null) && (typeof sRef2 === 'string')){
                            bResult = /* equals */(<any>((o1: any, o2: any) => o1 && o1.equals ? o1.equals(o2) : o1 === o2)(sRef1,sRef2));
                        } else if (sRef2 != null && (sRef2 != null && sRef2 instanceof <any>PrologPlusCG.prolog.PrologList)){
                            bResult = this.env.compile.hasString(sRef1, <PrologPlusCG.prolog.PrologList>sRef2);
                        }
                    };}
                }
            };}
            if (!bResult){
                let ensRef1: PrologPlusCG.prolog.PrologList;
                let ensRef2: PrologPlusCG.prolog.PrologList = null;
                for(let listIndex3: number = 0; listIndex3 < /* size */(<number>G1.m_vctConcepts.length) && !bResult; ++listIndex3) {{
                    C1 = /* get */G1.m_vctConcepts[listIndex3];
                    ensRef1 = this.individu3(C1.m_pdReferent, nivG1);
                    if (ensRef1 != null){
                        for(let listIndex4: number = 0; listIndex4 < /* size */(<number>G2.m_vctConcepts.length) && !bResult; ++listIndex4) {{
                            C2 = /* get */G2.m_vctConcepts[listIndex4];
                            ensRef2 = this.individu3(C2.m_pdReferent, nivG2);
                            if (ensRef2 != null){
                                bResult = this.env.compile.setsAreEqual(ensRef1, ensRef2);
                            }
                        };}
                    }
                };}
            }
            if (bResult){
                /* addElement */(vConcs.push(C1)>0);
                /* addElement */(vConcs.push(C2)>0);
            }
            return bResult;
        }

        individu(Ref: PrologPlusCG.prolog.PrologData, ind: number): string {
            if (Ref == null){
                return null;
            }
            const ValRef: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(Ref, ind);
            if (ValRef.pData == null){
                return null;
            } else if (typeof ValRef.pData.data === 'string'){
                return <string>ValRef.pData.data;
            } else {
                return null;
            }
        }

        individu2(Ref: PrologPlusCG.prolog.PrologData, ind: number): any {
            if (Ref == null){
                return null;
            }
            const ValRef: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(Ref, ind);
            if (ValRef.pData == null){
                return null;
            } else {
                return ValRef.pData.data;
            }
        }

        individu3(Ref: PrologPlusCG.prolog.PrologData, ind: number): PrologPlusCG.prolog.PrologList {
            if (Ref == null){
                return null;
            }
            const ValRef: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(Ref, ind);
            if (ValRef.pData == null){
                return null;
            } else if (ValRef.pData.data != null && ValRef.pData.data instanceof <any>PrologPlusCG.prolog.PrologList){
                return <PrologPlusCG.prolog.PrologList>ValRef.pData.data;
            } else {
                return null;
            }
        }

        unifyWithBack(Cs1: PrologPlusCG.cg.Concept, Cs2: PrologPlusCG.cg.Concept, Ct1: PrologPlusCG.cg.Concept, Ct2: PrologPlusCG.cg.Concept, G1: PrologPlusCG.cg.CG, levelG1: number, levelG2: number): boolean {
            const bResult: boolean = this.UnifyConcept(Cs1, Cs2, levelG1, levelG2) && ((Ct1 == null) || this.UnifyConcept(Ct1, Ct2, levelG1, levelG2)) && this.propagateUnifyCG(G1, levelG1, levelG2);
            if (!bResult){
                this.env.unification.removeConstraints();
            }
            this.CMatchL_MakeEmpty();
            this.RMatchL_MakeEmpty();
            return bResult;
        }

        propagateUnifyCG(G1: PrologPlusCG.cg.CG, nivG1: number, nivG2: number): boolean {
            let BRes: boolean = true;
            let trouve: boolean = true;
            while((BRes && trouve)) {{
                let E: PrologPlusCG.prolog.ConceptUnification = null;
                trouve = false;
                for(let listIndex1: number = 0; listIndex1 < /* size */(<number>this.CMatchL.length) && !trouve; ++listIndex1) {{
                    E = /* get */this.CMatchL[listIndex1];
                    trouve = (!E.m_MatchedLocally);
                };}
                if (trouve){
                    BRes = this.UnifyBranchs(this.e_outComeBranch, E.m_ConcMatched1, E.m_ConcMatched2, nivG1, nivG2) && this.UnifyBranchs(this.e_inComeBranch, E.m_ConcMatched1, E.m_ConcMatched2, nivG1, nivG2);
                    if (BRes){
                        E.m_MatchedLocally = true;
                    }
                }
            }};
            return (BRes && this.postUnify(G1));
        }

        UnifyBranchs(BranchDirection: number, C1: PrologPlusCG.cg.Concept, C2: PrologPlusCG.cg.Concept, nivG1: number, nivG2: number): boolean {
            let bResult: boolean = true;
            let rel1: PrologPlusCG.cg.Relation;
            let bAlreadyUnified: boolean;
            let vRels1: Array<PrologPlusCG.cg.Relation> = null;
            if (BranchDirection === this.e_inComeBranch){
                vRels1 = C1.m_vctIncomingRelations;
            } else {
                vRels1 = C1.m_vctOutgoingRelations;
            }
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>vRels1.length) && bResult; ++listIndex1) {{
                rel1 = /* get */vRels1[listIndex1];
                bAlreadyUnified = false;
                let E: PrologPlusCG.prolog.RelationUnification = null;
                for(let listIndex2: number = 0; listIndex2 < /* size */(<number>this.RMatchL.length) && !bAlreadyUnified; ++listIndex2) {{
                    E = /* get */this.RMatchL[listIndex2];
                    bAlreadyUnified = (rel1 === E.m_RelMatched1);
                };}
                if (!bAlreadyUnified){
                    bResult = this.UnifyTheBranch(BranchDirection, rel1, C2, nivG1, nivG2);
                } else {
                    bResult = this.unificationIsValid(BranchDirection, C2, E.m_RelMatched1, E.m_RelMatched2);
                }
            };}
            return bResult;
        }

        unificationIsValid(BranchDirection: number, C2: PrologPlusCG.cg.Concept, rel1: PrologPlusCG.cg.Relation, rel2: PrologPlusCG.cg.Relation): boolean {
            let Ca1: PrologPlusCG.cg.Concept;
            let Ca2: PrologPlusCG.cg.Concept;
            let bResult: boolean = false;
            if (BranchDirection === this.e_inComeBranch){
                Ca1 = rel1.m_concSource;
                Ca2 = rel2.m_concSource;
                bResult = (C2 === rel2.m_concDestination);
            } else {
                Ca1 = rel1.m_concDestination;
                Ca2 = rel2.m_concDestination;
                bResult = (C2 === rel2.m_concSource);
            }
            if (bResult){
                const E: PrologPlusCG.prolog.ConceptUnification = this.inCMatchL(Ca1, Ca2);
                if (E != null){
                    bResult = ((E.m_ConcMatched1 === Ca1) && (E.m_ConcMatched2 === Ca2));
                } else {
                    bResult = false;
                }
            }
            return bResult;
        }

        /**
         * Verify that the pair (Ca1, Ca2) exists in concMatchVec
         * @param {PrologPlusCG.cg.Concept} Ca1
         * @param {PrologPlusCG.cg.Concept} Ca2
         * @return {PrologPlusCG.prolog.ConceptUnification}
         */
        inCMatchL(Ca1: PrologPlusCG.cg.Concept, Ca2: PrologPlusCG.cg.Concept): PrologPlusCG.prolog.ConceptUnification {
            let BRes: boolean = false;
            let E: PrologPlusCG.prolog.ConceptUnification = null;
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>this.CMatchL.length) && !BRes; ++listIndex1) {{
                E = /* get */this.CMatchL[listIndex1];
                if ((E.m_ConcMatched1 === Ca1) || (E.m_ConcMatched2 === Ca2)){
                    BRes = true;
                }
            };}
            if (BRes){
                return E;
            } else {
                return null;
            }
        }

        UnifyTheBranch(BranchDirection: number, rel1: PrologPlusCG.cg.Relation, C2: PrologPlusCG.cg.Concept, nivG1: number, nivG2: number): boolean {
            let BRes: boolean = false;
            let rel2: PrologPlusCG.cg.Relation = null;
            let vRels: Array<PrologPlusCG.cg.Relation>;
            if (BranchDirection === this.e_inComeBranch){
                vRels = C2.m_vctIncomingRelations;
            } else {
                vRels = C2.m_vctOutgoingRelations;
            }
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>vRels.length) && !BRes; ++listIndex1) {{
                rel2 = /* get */vRels[listIndex1];
                if (this.sameNameRel(rel1.m_pdRelationName, rel2.m_pdRelationName, nivG1, nivG2)){
                    BRes = true;
                }
            };}
            if (BRes){
                let bAlreadyUnified: boolean = false;
                let Er: PrologPlusCG.prolog.RelationUnification;
                for(let listIndex2: number = 0; listIndex2 < /* size */(<number>this.RMatchL.length) && !bAlreadyUnified; ++listIndex2) {{
                    Er = /* get */this.RMatchL[listIndex2];
                    bAlreadyUnified = (rel2 === Er.m_RelMatched2);
                };}
                if (bAlreadyUnified){
                    return false;
                }
                let Ca1: PrologPlusCG.cg.Concept;
                let Ca2: PrologPlusCG.cg.Concept;
                Ca1 = Ca2 = null;
                if (BranchDirection === this.e_inComeBranch){
                    Ca1 = rel1.m_concSource;
                    Ca2 = rel2.m_concSource;
                } else {
                    Ca1 = rel1.m_concDestination;
                    Ca2 = rel2.m_concDestination;
                }
                const E: PrologPlusCG.prolog.ConceptUnification = this.inCMatchL(Ca1, Ca2);
                if (E != null){
                    BRes = ((E.m_ConcMatched1 === Ca1) && (E.m_ConcMatched2 === Ca2));
                } else {
                    BRes = this.UnifyConcept(Ca1, Ca2, nivG1, nivG2);
                }
                if (BRes){
                    /* addElement */(this.RMatchL.push(new PrologPlusCG.prolog.RelationUnification(rel1, rel2))>0);
                }
            }
            return BRes;
        }

        postUnify(G1: PrologPlusCG.cg.CG): boolean {
            let BRes: boolean = true;
            let R: PrologPlusCG.cg.Relation;
            for(let listIndex1: number = 0; listIndex1 < /* size */(<number>G1.m_vctRelations.length) && BRes; ++listIndex1) {{
                R = /* get */G1.m_vctRelations[listIndex1];
                BRes = false;
                let er: PrologPlusCG.prolog.RelationUnification;
                for(let listIndex2: number = 0; listIndex2 < /* size */(<number>this.RMatchL.length) && !BRes; ++listIndex2) {{
                    er = /* get */this.RMatchL[listIndex2];
                    BRes = (R === er.m_RelMatched1);
                };}
            };}
            return BRes;
        }

        UnifyConcept(C1: PrologPlusCG.cg.Concept, C2: PrologPlusCG.cg.Concept, nivG1: number, nivG2: number): boolean {
            let BRes: boolean = false;
            if (this.UnifyConc(C1, C2, nivG1, nivG2)){
                /* addElement */(this.CMatchL.push(new PrologPlusCG.prolog.ConceptUnification(C1, C2, false))>0);
                BRes = true;
            }
            return BRes;
        }

        UnifyConc(C1: PrologPlusCG.cg.Concept, C2: PrologPlusCG.cg.Concept, nivG1: number, nivG2: number): boolean {
            let BRes: boolean = true;
            if ((C1.m_pdType == null) || (C2.m_pdType == null)){
                let Don1: PrologPlusCG.prolog.PrologData = null;
                let Don2: PrologPlusCG.prolog.PrologData = null;
                if (C1.m_pdType == null){
                    Don1 = C1.m_pdReferent;
                } else {
                    Don1 = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uConcept, C1);
                }
                if (C2.m_pdType == null){
                    Don2 = C2.m_pdReferent;
                } else {
                    Don2 = new PrologPlusCG.prolog.PrologData(PrologPlusCG.prolog.DataTypes.uConcept, C2);
                }
                BRes = this.env.unification.unify(Don1, nivG1, Don2, nivG2);
            } else {
                const Type3: string = this.UnifyTyp(C1.m_pdType, C2.m_pdType, nivG1, nivG2);
                BRes = !(Type3 === ("Absurd")) && this.UnifyRef(C1.m_pdReferent, C2.m_pdReferent, nivG1, nivG2) && this.conform(C2.m_pdReferent, nivG2, Type3) && this.UnifyValue(C1.m_pdValue, C2.m_pdValue, nivG1, nivG2);
            }
            return BRes;
        }

        UnifyTyp(pDonGch: PrologPlusCG.prolog.PrologData, pDonDrt: PrologPlusCG.prolog.PrologData, indGch: number, indDrt: number): string {
            const ValIndGch: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pDonGch, indGch);
            const ValIndDrt: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(pDonDrt, indDrt);
            let Type3: string = null;
            if ((ValIndGch.pData == null) && (ValIndDrt.pData != null)){
                this.env.unification.addConstraint2(ValIndDrt.pData, ValIndDrt.index, <string>pDonGch.data, indGch);
                Type3 = <string>ValIndDrt.pData.data;
            } else if ((ValIndGch.pData != null) && (ValIndDrt.pData == null)){
                this.env.unification.addConstraint2(ValIndGch.pData, ValIndGch.index, <string>pDonDrt.data, indDrt);
                Type3 = <string>ValIndGch.pData.data;
            } else if ((ValIndGch.pData == null) && (ValIndDrt.pData == null)){
                this.env.unification.addConstraint3(<string>pDonGch.data, indGch, <string>pDonDrt.data, indDrt);
            } else {
                let pDon1Gch: any;
                let pDon1Drt: any;
                pDon1Gch = ValIndGch.pData.data;
                pDon1Drt = ValIndDrt.pData.data;
                const sDon1: string = <string>pDon1Gch;
                const sDon2: string = <string>pDon1Drt;
                if (this.env.typeHierarchy == null){
                    throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified (a CG operation needs it).");
                }
                if (sDon1 === sDon2){
                    Type3 = sDon1;
                } else {
                    Type3 = this.env.typeHierarchy.maxComSubType(sDon1, sDon2);
                }
            }
            if (Type3 == null){
                console.info("Warning: At least one of the types should be a specific type.");
                Type3 = "Absurd";
            }
            return Type3;
        }

        UnifyRef(Ref1: PrologPlusCG.prolog.PrologData, Ref2: PrologPlusCG.prolog.PrologData, nivG1: number, nivG2: number): boolean {
            if ((Ref1 == null) || (Ref2 == null)){
                return true;
            }
            const ValIndGch: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(Ref1, nivG1);
            const ValIndDrt: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(Ref2, nivG2);
            if ((ValIndGch.pData != null) && (ValIndGch.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uIdentifier) && (ValIndGch.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uString) && (ValIndGch.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uSet)){
                throw new PrologPlusCG.prolog.ExecException("Error: the referent " + Ref1.data.toString() + "is not a variable, an identifier, a string or a set.");
            }
            if ((ValIndDrt.pData != null) && (ValIndDrt.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uIdentifier) && (ValIndDrt.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uString) && (ValIndDrt.pData.typeOfData !== PrologPlusCG.prolog.DataTypes.uSet)){
                throw new PrologPlusCG.prolog.ExecException("Error: the referent " + Ref1.data.toString() + "is not a variable, an identifier, a string or a set.");
            }
            if ((ValIndGch.pData != null) && (ValIndDrt.pData != null) && ((ValIndGch.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uIdentifier) || (ValIndGch.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uString)) && (ValIndDrt.pData.typeOfData === PrologPlusCG.prolog.DataTypes.uSet)){
                return this.env.compile.hasString(<string>ValIndGch.pData.data, <PrologPlusCG.prolog.PrologList>ValIndDrt.pData.data);
            } else {
                return this.env.unification.unify(Ref2, nivG2, Ref1, nivG1);
            }
        }

        UnifyValue(Val1: PrologPlusCG.prolog.PrologData, Val2: PrologPlusCG.prolog.PrologData, nivG1: number, nivG2: number): boolean {
            if ((Val1 == null) || (Val2 == null)){
                return true;
            } else {
                return this.env.unification.unify(Val2, nivG2, Val1, nivG1);
            }
        }

        public conform(Ref: PrologPlusCG.prolog.PrologData, niv: number, Typ: string): boolean {
            if (Ref == null){
                return true;
            }
            let bResult: boolean = false;
            const contr: PrologPlusCG.prolog.PrologDataIndexPair = this.env.unification.valueFromUnifStack(Ref, niv);
            if (this.env.typeHierarchy == null){
                throw new PrologPlusCG.prolog.ExecException("Error : No type hierarchy is specified (a CG operation needs it).");
            }
            if (contr.pData == null){
                bResult = true;
            } else if (typeof contr.pData.data === 'string'){
                const st: string = <string>contr.pData.data;
                if (st === ("super")){
                    bResult = true;
                } else {
                    bResult = this.env.typeHierarchy.isInstanceOf(<string>contr.pData.data, Typ);
                }
            } else {
                const refEns: PrologPlusCG.prolog.PrologList = <PrologPlusCG.prolog.PrologList>contr.pData.data;
                bResult = true;
                let tmpData: PrologPlusCG.prolog.PrologData = null;
                for(let listIndex: number = 0; listIndex < refEns.size() && bResult; ++listIndex) {{
                    tmpData = <PrologPlusCG.prolog.PrologData>refEns.get(listIndex);
                    bResult = this.env.typeHierarchy.isInstanceOf(<string>tmpData.data, Typ);
                };}
            }
            return bResult;
        }
    }
    UnifyCG["__class"] = "PrologPlusCG.prolog.UnifyCG";
    UnifyCG["__interfaces"] = ["PrologPlusCG.prolog.DataTypes"];


}
namespace PrologPlusCG.prolog {
    export class UnitType {
        unit: { str: string, toString: Function }

        typUnit: number;

        constructor(unitee: { str: string, toString: Function }, typUnite: number) {
            if (this.unit === undefined) { this.unit = null; }
            if (this.typUnit === undefined) { this.typUnit = 0; }
            this.unit = unitee;
            this.typUnit = typUnite;
        }
    }
    UnitType["__class"] = "PrologPlusCG.prolog.UnitType";

}
namespace PrologPlusCG.prolog {
    export class VariableIndexPair {
        idVariable: string;

        index: number;

        constructor(s: string, i: number) {
            if (this.idVariable === undefined) { this.idVariable = null; }
            if (this.index === undefined) { this.index = 0; }
            this.idVariable = s;
            this.index = i;
        }
    }
    VariableIndexPair["__class"] = "PrologPlusCG.prolog.VariableIndexPair";

}
namespace PrologPlusCG.prolog {
    export class VariableIndexPairList {
        /*private*/ vec: Array<PrologPlusCG.prolog.VariableIndexPair>;

        ValInd: PrologPlusCG.prolog.PrologDataIndexPair;

        constructor() {
            if (this.vec === undefined) { this.vec = null; }
            if (this.ValInd === undefined) { this.ValInd = null; }
            this.vec = <any>([]);
            this.ValInd = null;
        }

        public size(): number {
            return /* size */(<number>this.vec.length);
        }

        public get(index: number): PrologPlusCG.prolog.VariableIndexPair {
            if (index < /* size */(<number>this.vec.length)){
                return /* get */this.vec[index];
            } else {
                return null;
            }
        }

        public add(vip: PrologPlusCG.prolog.VariableIndexPair) {
            /* add */(this.vec.push(vip)>0);
        }

        public addElement(vip: PrologPlusCG.prolog.VariableIndexPair) {
            this.add(vip);
        }

        public clear() {
            /* clear */(this.vec.length = 0);
        }

        public isEmpty(): boolean {
            return /* isEmpty */(this.vec.length == 0);
        }
    }
    VariableIndexPairList["__class"] = "PrologPlusCG.prolog.VariableIndexPairList";

}
namespace PrologPlusCG {
    export class PPCGIO_JS extends PrologPlusCG.prolog.PPCGIO {
        consoleDOMElement: HTMLElement;

        public constructor(myenv: PrologPlusCG.prolog.PPCGEnv, strConsoleDOMElementName: string) {
            super(myenv);
            this.consoleDOMElement = null;
            if (strConsoleDOMElementName != null && strConsoleDOMElementName !== ""){
                this.consoleDOMElement = <HTMLElement>document.querySelector(strConsoleDOMElementName);
            } else {
                this.consoleDOMElement = null;
            }
        }

        public appendToConsole(strToPrint: string) {
            if (this.consoleDOMElement != null){
                const realStringToPrint: string = /* replaceAll */strToPrint.replace(new RegExp("\n", 'g'),"<br/>");
                this.consoleDOMElement.innerHTML += realStringToPrint;
            }
        }

        public clearConsole() {
            if (this.consoleDOMElement != null){
                this.consoleDOMElement.innerHTML = "";
            }
        }

        public setPrompt(strToPrint: string) {
        }

        public getNextQuery(): string {
            return "";
        }

        public showMessageDialog(strMessage: string, strTitle: string) {
            alert(strTitle + ":\n" + strMessage);
        }

        public showPrompt() {
        }

        public setProgramText(strProgram: string) {
            this.env.setProgramText(strProgram);
        }

        public readSomething(readingMode: number) {
        }
    }
    PPCGIO_JS["__class"] = "PrologPlusCG.PPCGIO_JS";

}
namespace PrologPlusCG.prolog {
    export class PrologList extends PrologPlusCG.prolog.PrologDataVector {
        constructor() {
            super(5, 2);
        }

        public myDestroy() {
            if (this.size() === 0){
                return;
            } else {
                let uneDon: PrologPlusCG.prolog.PrologData;
                for(let index: number = 0; index < this.size(); ++index) {{
                    uneDon = <PrologPlusCG.prolog.PrologData>this.get(index);
                    uneDon.myDestroy();
                };}
                this.clear();
            }
        }

        public myCopy(): PrologList {
            let newList: PrologList = null;
            if (this.size() !== 0){
                newList = new PrologList();
                let aPrologData: PrologPlusCG.prolog.PrologData;
                for(let index: number = 0; index < this.size(); ++index) {{
                    aPrologData = this.get(index);
                    newList.addData(aPrologData.myCopy());
                };}
            }
            return newList;
        }

        public getAt(i: number): PrologPlusCG.prolog.PrologData {
            return <PrologPlusCG.prolog.PrologData>this.elementAt(i);
        }

        public addData(don: PrologPlusCG.prolog.PrologData) {
            this.addElement(don);
        }
    }
    PrologList["__class"] = "PrologPlusCG.prolog.PrologList";

}
namespace PrologPlusCG.prolog {
    export class PrologTerm extends PrologPlusCG.prolog.PrologDataVector {
        constructor() {
            super(5, 2);
        }

        public getAt(i: number): PrologPlusCG.prolog.PrologData {
            return <PrologPlusCG.prolog.PrologData>this.elementAt(i);
        }

        public myDestroy() {
            if (this.size() === 0){
                return;
            } else {
                this.clear();
            }
        }

        public myCopy(): PrologTerm {
            let newTerm: PrologTerm = null;
            if (this.size() !== 0){
                newTerm = new PrologTerm();
                let aPrologData: PrologPlusCG.prolog.PrologData;
                for(let listIndex: number = 0; listIndex < this.size(); ++listIndex) {{
                    aPrologData = this.get(listIndex);
                    newTerm.addData(aPrologData.myCopy());
                };}
            }
            return newTerm;
        }

        public hasOnlyAtoms(env: PrologPlusCG.prolog.PPCGEnv): boolean {
            if (this.size() === 0){
                return true;
            } else {
                let aPrologData: PrologPlusCG.prolog.PrologData;
                for(let listIndex: number = 0; listIndex < this.size(); ++listIndex) {{
                    aPrologData = this.get(listIndex);
                    if (aPrologData.typeOfData !== PrologPlusCG.prolog.DataTypes.uIdentifier){
                        return false;
                    } else {
                        const myIdent: string = <string>aPrologData.data;
                        const bIsVar: boolean = env.compile.identifierIsVar(myIdent);
                        if (bIsVar){
                            return false;
                        }
                    }
                };}
                return true;
            }
        }

        public addData(don: PrologPlusCG.prolog.PrologData) {
            this.addElement(don);
        }
    }
    PrologTerm["__class"] = "PrologPlusCG.prolog.PrologTerm";

}

