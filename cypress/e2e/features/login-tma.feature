@skip
Feature: Login_Logout Functionality

  Background:
    Given the user is on the home page
    When clicks on the Login button

  Scenario Outline: Login with different username and password combinations
    When enters "<username>" and "<password>"
    Then the system should display "<expectedResult>"

    Examples:
      | username             | password     | expectedResult                          |
      | ntntram@tma.com.vn   | Fpw10@2@2025 | Home page displayed                     |
      | invalid_user@tma.com | wrongPass    | Invalid username or password            |
      | abc                  | wrongPass    | Invalid username or password            |
      |                      |              | Email is required, Password is required |

  Scenario: Logout successfully
    Given the user has logged in successfully
    When clicks the logout button
    Then the system should navigate to the login page

  Scenario: Switch language to Vietnamese from dropdown
    When selects "Tiếng Việt" from the language dropdown
    Then the page should display "Chào mừng"

  Scenario: Verify Forgot password link
    When clicks on the Forgot password link
    Then the URL should contain "/login-actions/reset-credentials"

  Scenario: Verify TMA logo visibility
    Then the TMA logo should be visible

  Scenario: Verify page title and subtitle
    Then the page should display the title "Welcome to T-Learning!👋"
    And the subtitle "Log in to your account to access and use!"

  Scenario: Toggle password visibility
    When types password "password12345678"
    And clicks the eye icon
    Then the password field should be visible
    When clicks the eye-slash icon
    Then the password field should be hidden
