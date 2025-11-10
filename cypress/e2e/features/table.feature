@skip
Feature: Verify table dât with csv file

Scenario: Compare HTML table content with csv data
    Given open the users table page
    When read data from "users.csv"
    Then the table content should match the csv data