**Weippy** is a chromium based browser extension that highlights Story Protocol users on X (Twitter).
## Purpose

The primary goal of **Weippy** is to **support and promote the Story Protocol ecosystem and users** by enhancing user interaction on Twitter (X). This extension helps users easily identify other members of the Story Protocol community, including admins and ecosystem projects, mods, KaitoAI top100 users, adept and seeker OG role holders from discord, by highlighting their usernames with custom colors and GIFs. Additionally, it keeps users informed with the latest updates from key accounts in the ecosystem.

By fostering better visibility and engagement within the community, **Weippy** aims to create a more connected and interactive environment for Story Protocol enthusiasts.

## Features
- **Highlights usernames with custom colors and GIFs.**
   - The extension uses a list of predefined Story Protocol usernames stored in a JSON file.
   - When you visit Twitter, the extension scans the page for usernames matching the list and highlights them using custom colors.
   - If available, a small GIF icon is displayed next to the profile username to visually identify admins or special users.
   - The extension uses a **Mutation Observer** to detect new tweets or profile updates as you scroll.
   - This ensures usernames are highlighted in real-time, even when Twitter dynamically loads more content.
- **Displays specified names on hover.**
  - When you hover over a highlighted username, the extension displays a **tooltip** showing the **batch name** or **user role** (e.g., "Team Member", "Ecosystem Project", etc.).
  - This feature makes it easy to identify the user's connection to the Story Protocol ecosystem at a glance.
- **Toggle highlighter on/off with a simple button.**
   - A simple **toggle button** in the extension popup allows you to turn the highlighting on or off.
   - When you turn it off, all highlights and GIFs are removed from the page.
- **Shows users a list to follow other Twitter accounts.**

## Free & Secure

This extension is **completely free to use** and **does not contain any internal threats or malicious code**. It only accesses publicly available Twitter data and does not collect, store, or transmit any personal information from users. The code is open-source, allowing anyone to inspect and verify its safety.

## Supported Browsers
This extension is only supported on chromium based browsers, such as:
- Google Chrome
- Microsoft Edge
- Opera
- Brave
- Vivaldi
- Epic Privacy Browser

## Installation
1. [Download it](https://github.com/sagorahmed/Weippy/archive/refs/heads/master.zip) as a ZIP file and unzip on your computer or clone this repository:
   ```bash
   git clone https://github.com/sagorahmed/Weippy.git
   
2. Open your browser and navigate to:
   - **Chrome:** chrome://extensions/
   - **Brave:** brave://extensions/

3. Enable **Developer Mode** and click **Load unpacked**.

4. Select the **WeIppy** folder and open X.

## Future Plans

- **Expand the Username List:**  
  I'll continuously update and expand the list of Story Protocol users, making it easier to recognize new members and contributors within the ecosystem.

- **Unified Update View:**  
  I plan to introduce a feature that allows users to view updates from specified Story Protocol accounts in a single, consolidated interface within the extension.

- **Your Tweets Are IP:**  
  I will work on integrating the extension with the **Story Protocol blockchain**. This will allow users to **register their tweets as IP assets**, protecting and validating their content directly on the blockchain.

## Contributing
Feel free to fork this repository, suggest features, report issues, or submit pull requests to improve the extension!

## License
This project is licensed under the [MIT License.](https://github.com/sagorahmed/Weippy?tab=Apache-2.0-1-ov-file)



