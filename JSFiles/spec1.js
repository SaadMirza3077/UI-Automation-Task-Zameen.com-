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
describe('Verify that the results and details page match the extra filters', function () {
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
            // await browser.sleep(2000);
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
    it('Apply more filters', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // await browser.sleep(3000);
            condition = yield EC.visibilityOf(obj.MoreFiltersButton);
            yield protractor_1.browser.wait(condition, 30000);
            yield obj.MoreFiltersButton.click();
            yield console.log("More filters button clicked");
            for (let i = 0; i < 5; i++) {
                yield obj.BedroomAddIcon.click();
            }
            yield console.log("5 bedrooms added");
            yield obj.ShowStaysButton.click();
            yield console.log("Show Stays button clicked");
        });
    });
    it('Verify that the properties displayed on the first page have at least the number of selected bedroom.', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // await browser.sleep(6000);
            condition = yield EC.visibilityOf(protractor_1.element(protractor_1.by.xpath("//div[@class='_1s7voim'][1]")));
            yield protractor_1.browser.wait(condition, 30000);
            var list = yield protractor_1.element.all(protractor_1.By.xpath("//div[@class='_1s7voim'][1]")).count();
            yield console.log(list);
            for (let i = 1; i <= list; i++) {
                var txt = yield protractor_1.element(protractor_1.By.xpath("//div[@class='_8ssblpx'][" + i + "]//div[@class='_1s7voim'][1]")).getText();
                yield console.log(txt);
                var txt1 = yield txt.split("·");
                yield console.log(txt1[1]);
                var num = yield txt1[1].match(/\d+/g);
                var numb = yield Number(num);
                yield console.log(num);
                yield console.log(numb);
                if (numb >= 5) {
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
    it('Open the details of the first property and Check that in the Amenities popup Pool is displayed under Facilities category.', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield obj.FirstPropertyCard.click();
            yield console.log("First property card clicked");
            yield protractor_1.browser.getAllWindowHandles().then((handles) => __awaiter(this, void 0, void 0, function* () {
                yield protractor_1.browser.switchTo().window(handles[1]);
                yield protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.PAGE_DOWN).perform();
                condition = yield EC.visibilityOf(obj.AmenitiesHyperLink);
                yield protractor_1.browser.wait(condition, 30000);
                yield obj.AmenitiesHyperLink.click();
                yield console.log("Amenities Hyperlink clicked");
                condition = yield EC.visibilityOf(obj.PoolFacility);
                yield protractor_1.browser.wait(condition, 3000);
                var txt = yield obj.PoolFacility.getText();
                yield expect(txt).toContain("Pool", "Pool is not being displayed under Facilities category.");
                yield console.log("Pool is displayed under Facilities category.");
            }));
        });
    });
});
