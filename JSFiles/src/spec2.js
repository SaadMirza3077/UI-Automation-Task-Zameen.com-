"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const ObjectClass_1 = require("../ObjectClass");
const Utility_1 = require("../Utility");
describe('Verify that a property is displayed on the map correctly', function () {
    let obj = new ObjectClass_1.ObjectClass();
    let utility = new Utility_1.Utility();
    let EC = protractor_1.ExpectedConditions;
    let condition;
    let SearchedText = "Rome, Italy";
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
            yield protractor_1.browser.wait(EC.visibilityOf(obj.LocationInputField), 20000);
            yield obj.LocationInputField.click();
            yield obj.LocationInputField.sendKeys(SearchedText);
            yield obj.LocationInputField.sendKeys(protractor_1.protractor.Key.ENTER);
            yield console.log("Data entered in Location field");
            var CheckInDate = yield utility.GetSpecificDate(7);
            yield console.log(CheckInDate);
            try {
                yield protractor_1.browser.wait(EC.visibilityOf(protractor_1.element(protractor_1.By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]"))), 6000);
                yield protractor_1.element(protractor_1.By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]")).click();
                yield console.log("CheckIn Date clicked");
            }
            catch (Except) {
                yield protractor_1.browser.wait(EC.visibilityOf(obj.MoveToNextMonthIcon), 6000);
                yield obj.MoveToNextMonthIcon.click();
                yield console.log("Next month icon clicked on calendar");
                condition = yield EC.visibilityOf(protractor_1.element(protractor_1.By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]")));
                yield protractor_1.browser.wait(condition, 3000);
                yield protractor_1.element(protractor_1.By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]")).click();
                yield console.log("CheckIn Date clicked");
            }
            var CheckOutDate = yield utility.GetSpecificDate(14);
            yield console.log(CheckOutDate);
            try {
                yield protractor_1.browser.wait(EC.visibilityOf(protractor_1.element(protractor_1.By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]"))), 6000);
                yield protractor_1.element(protractor_1.By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]")).click();
                yield console.log("CheckOut Date clicked");
            }
            catch (Except) {
                yield obj.MoveToNextMonthIcon.click();
                yield console.log("Next month icon clicked on calendar");
                condition = yield EC.visibilityOf(protractor_1.element(protractor_1.By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]")));
                yield protractor_1.browser.wait(condition, 3000);
                yield protractor_1.element(protractor_1.By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]")).click();
                yield console.log("CheckOut Date clicked");
            }
            yield protractor_1.browser.wait(EC.visibilityOf(obj.GuestDropdown), 6000);
            yield obj.GuestDropdown.click();
            yield console.log("Guest dropdown clicked");
            yield protractor_1.browser.wait(EC.visibilityOf(obj.AdultsAddIcon), 6000);
            yield obj.AdultsAddIcon.click();
            yield obj.AdultsAddIcon.click();
            yield console.log("2 Adults added as Guest");
            yield protractor_1.browser.wait(EC.visibilityOf(obj.ChildrenAddIcon), 6000);
            yield obj.ChildrenAddIcon.click();
            yield console.log("1 Child added as Guest");
            yield protractor_1.browser.wait(EC.visibilityOf(obj.GuestDropdown), 6000);
            yield obj.GuestDropdown.click();
            yield console.log("Guest dropdown clicked");
            yield protractor_1.browser.wait(EC.visibilityOf(obj.SearchButton), 6000);
            yield obj.SearchButton.click();
            yield console.log("Search button clicked");
        });
    });
    it('Hover over the first property and Check that the property is displayed on the map and the color changes to indicate the selection.', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.sleep(2000);
            condition = yield EC.visibilityOf(obj.FirstPropertyMapLocation);
            yield protractor_1.browser.wait(condition, 30000);
            yield protractor_1.browser.actions().mouseMove(obj.FirstPropertyCard).perform();
            yield console.log("Mouse hovered over first property");
            yield protractor_1.browser.sleep(2000);
            var txt = yield obj.FirstPropertyMapLocation.getCssValue("background-color");
            yield console.log(txt);
            yield expect(txt).toContain("rgba(34, 34, 34, 1)", "The property is not being displayed on the map and the color does not change to indicate the selection.");
            yield console.log("The property is displayed on the map and the color changes to indicate the selection.");
        });
    });
    it('After identifying the property on the map, click it and Verify that the details shown in the map popup are the same as the ones shown in the search results.', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.wait(EC.visibilityOf(obj.FirstPropertyMapLocation), 6000);
            yield obj.FirstPropertyMapLocation.click();
            yield console.log("First property location on map clicked");
            condition = yield EC.visibilityOf(obj.FirstPropertyNameOnCard);
            yield protractor_1.browser.wait(condition, 30000);
            let MapName = yield obj.PropertyNameOnMapPopup.getText();
            yield console.log(MapName);
            let CardName = yield obj.FirstPropertyNameOnCard.getText();
            yield console.log(CardName);
            yield yield expect(MapName).toContain(CardName, "Details shown in the map popup are not the same as the ones shown in the search results.");
            yield console.log("Details shown in the map popup are the same as the ones shown in the search results.");
        });
    });
});
