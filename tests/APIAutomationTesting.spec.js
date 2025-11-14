import { test, expect, request } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Create New User sending post request', async () => {
  const requestContext = await request.newContext();

  // 1️⃣ Generate a unique email
  const timestamp = Date.now();
  const email = `user_test102522@example.com`;
  const password = 'Password123!';

  // 2️⃣ Send POST request to create account
  const response = await requestContext.post('https://automationexercise.com/api/createAccount', {
    form: {
      name: 'Test User',
      email: email,
      password: password,
      title: 'Mr',
      birth_date: '10',
      birth_month: '10',
      birth_year: '1990',
      firstname: 'Test',
      lastname: 'User',
      company: 'AutomationTest',
      address1: '123 Main St',
      address2: '',
      country: 'United States',
      zipcode: '10001',
      state: 'New York',
      city: 'New York',
      mobile_number: '1234567890'
    }
  });

  const result = await response.json();
  console.log('Create account response:', result);
  
  //console.log('Status:', response.status());
  //console.log('Body:', await response.text());

  // Optionally Validate status Code(200)
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  // Check the body for responseCode and message
  const body = await response.json();
  // Validate Response Status
  expect(body.responseCode).toBe(201);
  // Assert that response text contains("User created!") phrase
  expect(body.message).toBe('User created!');

});