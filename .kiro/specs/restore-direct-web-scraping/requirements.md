# Requirements Document

## Introduction

The current challenge generation system uses API-based approaches with fallback mechanisms, but users need the original functionality that directly scraped LeetCode website content without APIs. Additionally, there's a critical bug where the challenge script always generates the same problem regardless of difficulty selection, preventing effective practice variety.

## Requirements

### Requirement 1

**User Story:** As a developer practicing coding problems, I want the challenge script to directly scrape problem information from LeetCode website, so that I can get complete problem data without relying on APIs that may be blocked or rate-limited.

#### Acceptance Criteria

1. WHEN the challenge script runs THEN it SHALL fetch problem descriptions directly from LeetCode website HTML
2. WHEN scraping problem data THEN it SHALL extract complete problem descriptions, examples, constraints, and test cases
3. WHEN accessing LeetCode pages THEN it SHALL parse the HTML content to get all necessary problem information
4. IF the website structure changes THEN the scraper SHALL handle common HTML variations gracefully

### Requirement 2

**User Story:** As a developer, I want the challenge script to generate different problems each time I run it with the same difficulty, so that I can practice diverse problems and improve my skills effectively.

#### Acceptance Criteria

1. WHEN I run `yarn lct c easy 1` multiple times THEN it SHALL generate different easy problems each time
2. WHEN I specify a difficulty level THEN the system SHALL randomly select from available problems of that difficulty
3. WHEN generating random problems THEN it SHALL avoid recently generated problems to ensure variety
4. IF I run the same command 10 times THEN I SHALL get at least 8 different problems (allowing for some occasional repeats)

### Requirement 3

**User Story:** As a developer, I want the web scraping approach to extract all essential problem components, so that I have complete information needed to solve the problem effectively.

#### Acceptance Criteria

1. WHEN scraping a problem page THEN it SHALL extract the problem title, description, and difficulty level
2. WHEN parsing problem content THEN it SHALL capture all example inputs and outputs with explanations
3. WHEN extracting problem data THEN it SHALL include constraints, follow-up questions, and hints if available
4. IF the problem has multiple solution approaches THEN the scraper SHALL capture any provided approach hints

### Requirement 4

**User Story:** As a developer, I want the direct web scraping to work reliably across different problem types and formats, so that I can practice any LeetCode problem without compatibility issues.

#### Acceptance Criteria

1. WHEN scraping problems THEN it SHALL handle different problem formats (algorithm, database, shell, etc.)
2. WHEN extracting content THEN it SHALL properly parse problems with images, tables, or special formatting
3. WHEN processing problem data THEN it SHALL maintain proper code formatting and syntax highlighting information
4. IF a problem has interactive elements THEN the scraper SHALL extract the essential static content

### Requirement 5

**User Story:** As a developer, I want the web scraping system to be efficient and respectful, so that it doesn't overload LeetCode servers or get blocked.

#### Acceptance Criteria

1. WHEN making web requests THEN it SHALL include appropriate delays between requests to avoid rate limiting
2. WHEN scraping multiple problems THEN it SHALL implement reasonable request throttling
3. WHEN accessing LeetCode pages THEN it SHALL use proper user agent headers and request patterns
4. IF rate limiting is detected THEN it SHALL implement exponential backoff retry logic

### Requirement 6

**User Story:** As a developer, I want the system to maintain backward compatibility with existing project structure, so that my current practice setup continues to work without changes.

#### Acceptance Criteria

1. WHEN the new scraping system is implemented THEN it SHALL create the same file structure as the current system
2. WHEN generating problem files THEN it SHALL maintain the same naming conventions and directory organization
3. WHEN creating problem templates THEN it SHALL use the same code template format as existing problems
4. IF users have existing problems THEN the new system SHALL not interfere with or modify existing problem files