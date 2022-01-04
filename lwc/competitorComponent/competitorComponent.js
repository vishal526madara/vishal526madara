import { LightningElement, api } from 'lwc';
import COMPETITOR_OBJECT from '@salesforce/schema/OpportunityCompetitor';
import STRENGTHS from '@salesforce/schema/OpportunityCompetitor.Strengths';
import WEAKNESSES from '@salesforce/schema/OpportunityCompetitor.Weaknesses';
export default class CompetitorComponent extends LightningElement {
    competitorObject = COMPETITOR_OBJECT;
    competitorFields = [STRENGTHS, WEAKNESSES];
    @api recordId;

    createRecord() {

    }

}