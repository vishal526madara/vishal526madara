import { LightningElement, api } from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import deleteLead from '@salesforce/apex/DeleteLeadController.deleteLead';
import deleteDuplicateLead from '@salesforce/apex/DeleteLeadController.deleteDuplicateLead';
export default class RedirectLeadPage extends NavigationMixin(LightningElement) {
    @api recordId;
    navLeadId;
    connectedCallback() {
        this.deleteLead();
    }

    deleteLead() {
        console.log('Function Called::::::' + this.recordId);
        deleteLead({ recordId: this.recordId })
            .then(result => {
                console.log('Resulted Value::' + JSON.stringify(result));
                console.log('Resulted Value::::' + result.navLeadId);
                console.log('Resulted Value::::' + result.checkStatus + '  ' + typeof result.checkStatus)
                console.log('Resulted Value::::' + result + '   ' + typeof result);
                console.log('Function Called::::');
                if (result.checkStatus && result.objName == 'Account') {
                    this.navLeadId = result.navLeadId;
                    this.navigateAccountRecord();
                } else if (result.checkStatus && result.objName != 'Account') {
                    this.navLeadId = result.navLeadId;
                    console.log('Value::::::' + this.navLeadId);
                    this.navigateLeadRecord();
                }

            })
            .catch(error => {
                console.log('Error:::::' + error);
                console.log('Error::::' + JSON.stringify(error));
            })
    }

    navigateLeadRecord() {
        console.log('Navigation Function Called:::');
        let recordval = this.navLeadId;
        let duplicateLeadId = this.recordId;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordval,
                objectApiName: 'Lead',
                actionName: 'view'
            }
        });
        deleteDuplicateLead({ duplicateId: duplicateLeadId })
            .then(result => {
                console.log('Finish:::::');

            })
            .catch(error => {
                console.log('Error Value::::' + error);
            })
    }


    navigateAccountRecord() {
        console.log('Second Navigation Function Called:::');
        let recordval = this.navLeadId;
        let duplicateLeadId = this.recordId;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordval,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }
}