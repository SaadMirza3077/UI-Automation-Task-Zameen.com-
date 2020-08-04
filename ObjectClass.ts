import { ElementFinder, element, By } from "protractor";

export class ObjectClass {

    LocationInputField: ElementFinder = element(By.id("bigsearch-query-detached-query"));

    FirstSearchedLocation: ElementFinder = element(By.xpath("//ul[@id='Koan-magic-carpet-koan-search-bar__listbox']//li[@role='option'][1]"));

    GuestDropdown: ElementFinder = element(By.xpath("//button[@data-testid='structured-search-input-field-guests-button']"));

    SearchButton: ElementFinder = element(By.xpath("//div[@class='_rrbixv']//button[@type='button']"));

    AdultsAddIcon: ElementFinder = element(By.xpath("//div[@id='stepper-adults']//button[@aria-label='increase value']"));

    ChildrenAddIcon: ElementFinder = element(By.xpath("//div[@id='stepper-children']//button[@aria-label='increase value']"));

    MoveToNextMonthIcon: ElementFinder = element(By.xpath("//div[@aria-label='Move forward to switch to the next month.']//button"));

    GuestsFilter: ElementFinder = element(By.xpath("//div[@role='search']//button[3]"));

    DatesFilter: ElementFinder = element(By.xpath("//div[@role='search']//button[2]"));

    LocationFilter: ElementFinder = element(By.xpath("//div[@role='search']//button[1]"));

    MoreFiltersButton: ElementFinder = element(By.xpath("//span[contains(text(),'More filters')]//parent::button[@type='button']"));

    BedroomAddIcon: ElementFinder = element(By.xpath("//div[@id='filterItem-stepper-min_bedrooms-0']//*[@aria-label='increase value']"));

    PoolCheckBox: ElementFinder = element(By.xpath("//input[contains(@id,'filterItem-checkbox-amenities') and contains(@name,'Pool')]//following-sibling::span"));

    ShowStaysButton: ElementFinder = element(By.xpath("//button[@type='button' and contains(text(),'Show')]"));

    FirstPropertyCard: ElementFinder = element(By.xpath("//div[@class='_8ssblpx'][1]//a[@data-check-info-section='true']"));

    AmenitiesHyperLink: ElementFinder = element(By.xpath("//a[contains(text(),'Show all') and contains(text(),'amenities')]"));

    PoolFacility: ElementFinder = element(By.xpath("//div[contains(text(),'Pool')]"));

    FirstPropertyMapLocation: ElementFinder = element(By.xpath("//button[@data-veloute='map/markers/BasePillMarker']//span[@class='_1nq36y92']//parent::div"));

    FirstPropertyNameOnCard: ElementFinder = element(By.xpath("//div[@class='_8ssblpx'][1]//div[@class='_1c2n35az']"));

    PropertyNameOnMapPopup: ElementFinder = element(By.xpath("//div[@class='_v96gnbz']"));

}
