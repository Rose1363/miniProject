@skip
Feature: User Login on Sauce
    Scenario: Login with different username and password combinations
        Given user is on the login page
        When user enters "<username>" and "<password>"
    Then the system displays "<expectedResult>"
        Examples:
            | username        | password     | expectedResult                                                            |
            | standard_user   | secret_sauce | Home page displayed                                                       |
            | error_user      | wrongPass    | Epic sadface: Username and password do not match any user in this service |
            | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out.                       |
            |                 | secret_sauce | Epic sadface: Username is required                                      |
            | standard_user   |              | Epic sadface: Password is required                                       |