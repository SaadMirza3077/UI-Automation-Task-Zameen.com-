import { browser, element, by, By, $, $$, ExpectedConditions, protractor } from 'protractor';
import { async } from 'q';
import { ObjectClass } from '../ObjectClass';
import { Utility } from '../Utility';

describe('Verify that the results and details page match the extra filters', function () {


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

    await browser.wait(EC.visibilityOf(obj.LocationInputField), 20000);
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
      await browser.wait(condition, 6000);
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
      await browser.wait(EC.visibilityOf(obj.MoveToNextMonthIcon), 6000);
      await obj.MoveToNextMonthIcon.click();
      await console.log("Next month icon clicked on calendar");

      condition = await EC.visibilityOf(element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]")));
      await browser.wait(condition, 6000);
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

    await obj.GuestDropdown.click();
    await console.log("Guest dropdown clicked");

    await browser.wait(EC.visibilityOf(obj.SearchButton), 6000);
    await obj.SearchButton.click();
    await console.log("Search button clicked");

  });

  it('Apply more filters', async function () {

    condition = await EC.visibilityOf(obj.MoreFiltersButton);
    await browser.wait(condition, 30000);

    await obj.MoreFiltersButton.click();
    await console.log("More filters button clicked");

    await browser.wait(EC.visibilityOf(obj.BedroomAddIcon), 7000);

    for (let i = await 0; await i < 5; await i++) {
      await browser.wait(EC.visibilityOf(obj.BedroomAddIcon), 2000);
      await obj.BedroomAddIcon.click();
    }
    await console.log("5 bedrooms added");

    await browser.sleep(3000);

    await browser.wait(EC.visibilityOf(obj.PoolCheckBox), 30000);
    await obj.PoolCheckBox.click();
    await console.log("Pool checkbox clicked");

    await browser.wait(EC.visibilityOf(obj.ShowStaysButton), 10000);
    await obj.ShowStaysButton.click();
    await console.log("Show Stays button clicked");

  });

  it('Verify that the properties displayed on the first page have at least the number of selected bedroom.', async function () {

    await browser.sleep(2000);

    condition = await EC.visibilityOf(element(by.xpath("//div[@class='_kqh46o'][1]")));
    await browser.wait(condition, 30000);

    await browser.sleep(2000);

    var list = await element.all(By.xpath("//div[@class='_kqh46o'][1]")).count();
    await console.log(list);

    for (let i = await 1; await i <= list; await i++) {

      var txt = await element(By.xpath("//div[@class='_8ssblpx'][" + i + "]//div[@class='_kqh46o'][1]")).getText();
      await console.log(txt);

      var txt1 = await txt.split("·");
      await console.log(txt1[1]);

      var num = await txt1[1].match(/\d+/g);
      var numb = await Number(num);

      await console.log(num);
      await console.log(numb);

      if (numb >= 5) {
        await expect(true).toBe(true);
        await console.log("Card " + i + " criteria passed");
      }
      else {
        await console.log("Card " + i + " criteria failed");
        await expect(true).toBe(false);
      }

    }

  });

  it('Open the details of the first property and Check that in the Amenities popup Pool is displayed under Facilities category.', async function () {

    await browser.wait(EC.visibilityOf(obj.FirstPropertyCard), 6000);
    await obj.FirstPropertyCard.click();
    await console.log("First property card clicked");

    await browser.getAllWindowHandles().then(async (handles) => {

      await browser.switchTo().window(handles[1]);
      await browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();

      condition = await EC.visibilityOf(obj.AmenitiesHyperLink);
      await browser.wait(condition, 30000);

      await obj.AmenitiesHyperLink.click();
      await console.log("Amenities Hyperlink clicked");

      condition = await EC.visibilityOf(obj.PoolFacility);
      await browser.wait(condition, 9000);

      var txt = await obj.PoolFacility.getText();
      await expect(txt).toContain("Pool", "Pool is not being displayed under Facilities category.");
      await console.log("Pool is displayed under Facilities category.");

    });

  });

});
