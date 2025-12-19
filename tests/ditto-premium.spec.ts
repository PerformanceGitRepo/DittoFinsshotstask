import { test} from '@playwright/test';
import DittoHealthPage from '../pages/DittoHealthPage';

test('Verify Ditto total premium calculation', async ({ page }) => {
  const ditto = new DittoHealthPage(page);

  await test.step('Navigate to Ditto', async () => {
    await ditto.navigate('https://app.joinditto.in/fq');
  });

  await test.step('Select HDFC ERGO Optima Secure plan', async () => {
    await ditto.selectHDFCErgoOptimaSecure();
  });

  await test.step('Proceed through plan questions', async () => {
    await ditto.clickNext(3);
  });

    await test.step('Click on Continue Button', async () => {

    await ditto.clickContinue()
  });

  await test.step('Select gender as Male', async () => {
    await ditto.selectGenderMale();
  });

    await test.step('Click Next on Health Insurance Page', async () => {
    await ditto.clickOnNextStep();
  });

  await test.step('Fill age and pincode', async () => {
    await ditto.fillAgeAndPincode('29', '560037');
  });

  await test.step('Select First rider', async () => {
    await ditto.selectFirstRider();
  });

  await test.step('Capture premium breakup and validate total price', async () => {
    await ditto.getAddonAmounts();

  });

});
