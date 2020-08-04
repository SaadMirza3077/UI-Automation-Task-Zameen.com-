"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const ObjectClass_1 = require("./ObjectClass");
const Utility_1 = require("./Utility");
describe('Verify that the results match the search criteria', function () {
    let obj = new ObjectClass_1.ObjectClass();
    let utility = new Utility_1.Utility();
    let EC = protractor_1.ExpectedConditions;
    let condition;
    it('Open www.airbnb.com.', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.driver.manage().window().maximize();
            yield protractor_1.browser.waitForAngularEnabled(false);
            yield protractor_1.browser.get('https://www.airbnb.com/');
            yield console.log("airbnb application opened");
        });
    });
    it('Enter the search criteria', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield obj.LocationInputField.click();
            yield obj.LocationInputField.sendKeys("Rome");
            yield console.log("Data entered in Location field");
            //await browser.sleep(2000);
            condition = yield EC.visibilityOf(obj.FirstSearchedLocation);
            yield protractor_1.browser.wait(condition, 30000);
            yield obj.FirstSearchedLocation.click();
            yield console.log("Required location selected");
            var CheckInDate = yield utility.GetSpecificDate(7);
            yield console.log(CheckInDate);
            try {
                yield protractor_1.element(protractor_1.By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]")).click();
                yield console.log("CheckIn Date clicked");
            }
            catch (Except) {
                yield obj.MoveToNextMonthIcon.click();
                yield console.log("Next month icon clicked on calendar");
                // await browser.sleep(1000);
                condition = yield EC.visibilityOf(protractor_1.element(protractor_1.By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]")));
                yield protractor_1.browser.wait(condition, 3000);
                yield protractor_1.element(protractor_1.By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]")).click();
                yield console.log("CheckIn Date clicked");
            }
            var CheckOutDate = yield utility.GetSpecificDate(14);
            yield console.log(CheckOutDate);
            try {
                yield protractor_1.element(protractor_1.By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]")).click();
                yield console.log("CheckOut Date clicked");
            }
            catch (Except) {
                yield obj.MoveToNextMonthIcon.click();
                yield console.log("Next month icon clicked on calendar");
                // await browser.sleep(1000);
                condition = yield EC.visibilityOf(protractor_1.element(protractor_1.By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]")));
                yield protractor_1.browser.wait(condition, 3000);
                yield protractor_1.element(protractor_1.By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]")).click();
                yield console.log("CheckOut Date clicked");
            }
            yield obj.GuestDropdown.click();
            yield console.log("Guest dropdown clicked");
            yield obj.AdultsAddIcon.click();
            yield obj.AdultsAddIcon.click();
            yield console.log("2 Adults added as Guest");
            yield obj.ChildrenAddIcon.click();
            yield console.log("1 Child added as Guest");
            yield obj.GuestDropdown.click();
            yield console.log("Guest dropdown clicked");
            yield obj.SearchButton.click();
            yield console.log("Search button clicked");
        });
    });
    it('Verify that the applied filters are correct.', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // await browser.sleep(2000);
            condition = yield EC.visibilityOf(obj.GuestsFilter);
            yield protractor_1.browser.wait(condition, 30000);
            var txt = yield obj.GuestsFilter.getText();
            yield expect(txt).toContain("3 guests", "Applied filter of guests is incorrect");
            yield console.log("Applied filter of guests is correct");
            var date = yield utility.GetFilterDate();
            yield console.log(date);
            var filterdate = yield obj.DatesFilter.getText();
            yield console.log(filterdate);
            yield expect(date).toContain(filterdate, "Applied filter of date is incorrect");
            yield console.log("Applied filter of date is correct");
        });
    });
    it('Verify that the properties displayed on the first page can accommodate at least the selected number of guests.', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // await browser.sleep(5000);
            condition = yield EC.visibilityOf(protractor_1.element(protractor_1.by.xpath("//div[@class='_1s7voim'][1]")));
            yield protractor_1.browser.wait(condition, 30000);
            var list = yield protractor_1.element.all(protractor_1.By.xpath("//div[@class='_1s7voim'][1]")).count();
            yield console.log(list);
            for (let i = 1; i <= list; i++) {
                var txt;
                var rem;
                try {
                    txt = yield protractor_1.element(protractor_1.By.xpath("//div[@class='_8ssblpx'][" + i + "]//div[@class='_1s7voim'][1]")).getText();
                }
                catch (Except) {
                    rem = (list - i) + 1;
                    txt = yield protractor_1.element(protractor_1.By.xpath("//div[@class='_1gw6tte']//div[@style='margin-top: 24px;']//following-sibling::div//div[@class='_fhph4u']//div[@class='_8ssblpx'][" + rem + "]//div[@class='_1s7voim'][1]")).getText();
                }
                yield console.log(txt);
                var txt1 = yield txt.split("·");
                yield console.log(txt1[0]);
                var num = yield txt1[0].match(/\d+/g);
                var numb = yield Number(num);
                yield console.log(num);
                yield console.log(numb);
                if (numb >= 3) {
                    yield expect(true).toBe(true);
                    yield console.log("Card " + i + " criteria passed");
                }
                else {
                    yield console.log("Card " + i + " criteria failed");
                    yield expect(true).toBe(false);
                }
            }
        });
    });
});
