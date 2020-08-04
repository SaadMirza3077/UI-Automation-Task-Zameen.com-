
import { browser, element, by, By, $, $$, ExpectedConditions, protractor } from 'protractor';
import { async } from 'q';
import { ObjectClass } from '../ObjectClass';
import { Utility } from '../Utility';

describe('Verify that a property is displayed on the map correctly', function () {


  let obj = new ObjectClass();
  let utility = new Utility();

  let EC = ExpectedConditions;
  let condition;

  let SearchedText= "Rome, Italy"

  it('Open www.airbnb.com.', async function () {

    await browser.driver.manage().window().maximize();
    await browser.waitForAngularEnabled(false);
    await browser.get('https://www.airbnb.com/');
    await console.log("airbnb application opened");

  })

  it('Enter the search criteria', async function () {

    await browser.wait(EC.visibilityOf(obj.LocationInputField),20000);
    await obj.LocationInputField.click();
    await obj.LocationInputField.sendKeys(SearchedText);
    await obj.LocationInputField.sendKeys(protractor.Key.ENTER);
    await console.log("Data entered in Location field");

    var CheckInDate = await utility.GetSpecificDate(7);
    await console.log(CheckInDate);

    try {
      await browser.wait(EC.visibilityOf(element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]"))), 6000);
      await element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]")).click();
      await console.log("CheckIn Date clicked");
    }
    catch (Except) {
      await browser.wait(EC.visibilityOf(obj.MoveToNextMonthIcon), 6000);
      await obj.MoveToNextMonthIcon.click();
      await console.log("Next month icon clicked on calendar");

      condition = await EC.visibilityOf(element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]")));
      await browser.wait(condition, 3000);
      await element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]")).click();
      await console.log("CheckIn Date clicked");
    }

    var CheckOutDate = await utility.GetSpecificDate(14);
    await console.log(CheckOutDate);

    try {
      await browser.wait(EC.visibilityOf(element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]"))), 6000);
      await element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]")).click();
      await console.log("CheckOut Date clicked");
    }
    catch (Except) {
      await obj.MoveToNextMonthIcon.click();
      await console.log("Next month icon clicked on calendar");
     
      condition = await EC.visibilityOf(element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]")));
      await browser.wait(condition, 3000);
      await element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]")).click();
      await console.log("CheckOut Date clicked");
    }

    await browser.wait(EC.visibilityOf(obj.GuestDropdown), 6000);
    await obj.GuestDropdown.click();
    await console.log("Guest dropdown clicked");

    await browser.wait(EC.visibilityOf(obj.AdultsAddIcon), 6000);
    await obj.AdultsAddIcon.click();
    await obj.AdultsAddIcon.click();
    await console.log("2 Adults added as Guest");

    await browser.wait(EC.visibilityOf(obj.ChildrenAddIcon), 6000);
    await obj.ChildrenAddIcon.click();
    await console.log("1 Child added as Guest");

    await browser.wait(EC.visibilityOf(obj.GuestDropdown), 6000);
    await obj.GuestDropdown.click();
    await console.log("Guest dropdown clicked");

    await browser.wait(EC.visibilityOf(obj.SearchButton), 6000);
    await obj.SearchButton.click();
    await console.log("Search button clicked");

  });

  it('Hover over the first property and Check that the property is displayed on the map and the color changes to indicate the selection.', async function () {

    await browser.sleep(2000);

    condition = await EC.visibilityOf(obj.FirstPropertyMapLocation);
    await browser.wait(condition, 30000);

    await browser.actions().mouseMove(obj.FirstPropertyCard).perform();
    await console.log("Mouse hovered over first property");

    await browser.sleep(2000);

    var txt = await obj.FirstPropertyMapLocation.getCssValue("background-color");
    await console.log(txt);
    await expect(txt).toContain("rgba(34, 34, 34, 1)", "The property is not being displayed on the map and the color does not change to indicate the selection.");
    await console.log("The property is displayed on the map and the color changes to indicate the selection.");

  });


  it('After identifying the property on the map, click it and Verify that the details shown in the map popup are the same as the ones shown in the search results.', async function () {

    await browser.wait(EC.visibilityOf(obj.FirstPropertyMapLocation), 6000);
    await obj.FirstPropertyMapLocation.click();
    await console.log("First property location on map clicked");

    condition = await EC.visibilityOf(obj.FirstPropertyNameOnCard);
    await browser.wait(condition, 30000);

    let MapName = await obj.PropertyNameOnMapPopup.getText();
    await console.log(MapName);

    let CardName = await obj.FirstPropertyNameOnCard.getText();
    await console.log(CardName);

    await await expect(MapName).toContain(CardName, "Details shown in the map popup are not the same as the ones shown in the search results.");
    await console.log("Details shown in the map popup are the same as the ones shown in the search results.");

  });

});
