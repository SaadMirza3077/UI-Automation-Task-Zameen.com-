
export class Utility {

    GetSpecificDate(days: any) {

        var today = new Date(); //Today's Date

        var requiredDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + days);

        var date = requiredDate.toDateString();

        var Split = date.split(" ");

        var dayname = this.GetDay(Split[0]);

        var monthname = this.GetMonth(Split[1]);

        var d = this.GetDate(Split[2]);

        var year = Split[3];

        const formatted = `${dayname} ${monthname} ${d}, ${year}`;

        return formatted;

    }

    GetDay(day: any) {

        if (day == 'Mon') {
            return "Monday,";
        }
        else if (day == 'Tue') {
            return "Tuesday,";
        }
        else if (day == 'Wed') {
            return "Wednesday,";
        }
        else if (day == 'Thu') {
            return "Thursday,";
        }
        else if (day == 'Fri') {
            return "Friday,";
        }
        else if (day == 'Sat') {
            return "Saturday,";
        }
        else if (day == 'Sun') {
            return "Sunday,";
        }

    }

    GetMonth(month: any) {

        if (month == 'Jan') {
            return "January";
        }
        else if (month == 'Feb') {
            return "February";
        }
        else if (month == 'Mar') {
            return "March";
        }
        else if (month == 'Apr') {
            return "April";
        }
        else if (month == 'Jun') {
            return "June";
        }
        else if (month == 'Jul') {
            return "July";
        }
        else if (month == 'Aug') {
            return "August";
        }
        else if (month == 'Sep') {
            return "September";
        }
        else if (month == 'Oct') {
            return "October";
        }
        else if (month == 'Nov') {
            return "November";
        }
        else if (month == 'Dec') {
            return "December";
        }

    }

    GetDate(date: any) {

        if (date < '9') {
            return date.replace(/^0+/, '');
        }
        else {
            return date;
        }

    }

    GetFilterDate() {

        var today = new Date(); //Today's Date

        var requiredDate1 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

        var date1 = requiredDate1.toDateString();

        var Split1 = date1.split(" ");

        var monthname1 = Split1[1];

        var d1 = this.GetDate(Split1[2]);

        var year1 = Split1[3];

        today = new Date(); //Today's Date

        var requiredDate2 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);

        var date2 = requiredDate2.toDateString();

        var Split2 = date2.split(" ");

        var monthname2 = Split2[1];

        var d2 = this.GetDate(Split2[2]);

        var year2 = Split2[3];

        var formatted;

        if (monthname1 == monthname2) {
            // formatted = `${monthname1} ${d1} - ${d2}, ${year1}`;
            formatted = `${monthname1} ${d1} - ${d2}`;
        }
        else if (year1 != year2) {
            // formatted = `${monthname1} ${d1}, ${year1} - ${monthname2} ${d2}, ${year2}`;
            formatted = `${monthname1} ${d1}, ${year1} - ${monthname2} ${d2}`;
        }
        else {
            // formatted = `${monthname1} ${d1} - ${monthname2} ${d2}, ${year1}`;
            formatted = `${monthname1} ${d1} - ${monthname2} ${d2}`;
        }

        return formatted;

    }

}