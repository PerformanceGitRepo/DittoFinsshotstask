import { test, expect } from '@playwright/test';
import MakeMyTripHomePage from '../pages/MakeMyTripHomePage';
import MakeMyTripResultsPage from '../pages/MakeMyTripResultsPage';

test('List all hotels in Mumbai', async ({ page }) => {

  const home = new MakeMyTripHomePage(page);
  const results = new MakeMyTripResultsPage(page);

  // await home.navigate('https://www.makemytrip.com/');
  // await home.closeAccountLogin();
  // await home.selectHotelsTab();
  // await home.selectCity('Mumbai');
  // await home.selectDates();
  // await home.searchHotels();

  // const hotels = await results.getHotelNames();
  // console.log(hotels);

  // expect(hotels.length).toBeGreaterThan(0);

  // await home.takeScreenshot('mmt-hotels');
  await test.step('Navigate to MakeMyTrip website', async () => {
    await home.navigate('https://www.makemytrip.com');
  });

  await test.step('Close account login popup', async () => {
    await home.closeAccountLogin();
  });

  await test.step('Select Hotels tab', async () => {
    await home.selectHotelsTab();
  });

  await test.step('Select Mumbai as city', async () => {
    await home.selectCity('Mumbai');
  });

  await test.step('Select check-in and check-out dates', async () => {
    await home.selectDates();
  });

  await test.step('Search for hotels', async () => {
    await home.searchHotels();
  });

  let hotels: string[] = [];

  await test.step('Get all hotel names from results page', async () => {
    hotels = await results.getHotelNames();
    console.log(hotels);
  });

  await test.step('Validate hotels are listed', async () => {
    expect(hotels.length).toBeGreaterThan(0);
  });

  await test.step('Capture screenshot of hotel results', async () => {
    await home.takeScreenshot('mmt-hotels');
  });

});
