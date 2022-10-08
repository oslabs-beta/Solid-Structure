![](./extension/assets/SolidStructure.png)

# Solid Structure
Solid Structure is a Chrome Extension DevTool for [SolidJS](https://www.solidjs.com/) application.

Solid Structure allows developer to oversee a list of signal connections, signal updates, and visualize structural & dependency graphs of an inspected application.
<br></br>

## Features
- [x] Signal Tracker (Signal List)
- [x] Signal Update Logs (on/off)
- [x] Signal Visualizations
    - [x] Structural Graph
    - [x] Dependency Graph
    - [x] Box Orientation Adjustment
- [x] Dark Mode
- [ ] Chrome Extension Release
<br></br>

<p align="center">
  <img width="900" src="public/assets/demo_MVP.gif">
  <br></br>
  <img width="900" src="public/assets/demo_UIUX.gif">
</p>
<br/>

## Getting Started
### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/oslabs-beta/Solid-Structure.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run development environment (HMR with CRX)
   ```sh
   npm run dev
   ```
3. Check for creation of "dist" folder at the root directory

4. Go to "Manage Extension" at Chrome Browser

5. Upload "dist" folder 
<br></br>

### Checking Connection
Run a sample SolidJS application from a separate terminal
   ```sh
   npm run demoapp
   ```
<br/>

## Built With
* Solid.JS
* TypeScript
* SCSS
* D3.JS
* Vite (CRX)
* Chrome API DevTool
<br></br>

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add some NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request
<br></br>

## Basic Rules
* All types are managed in **types.ts** file
* Overall color-scheme and basic stylings are controlled in **main.scss** file
<br></br>

<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE.txt` for more information.
<br></br>

## Authors
* Matthew Yeon [@myeon7](https://github.com/myeon7)
* Brandon Brighi [@Bbrighi2](https://github.com/Bbrighi2)
* Tanner Lyon [@THLyon](https://github.com/THLyon)
* Mark Yermolov [@yermie123](https://github.com/yermie123)
<br></br>

## Acknowledgements
* [thetarnav/solid-devtools](https://github.com/thetarnav/solid-devtools)
* [CM-Tech/solid-debugger](https://github.com/CM-Tech/solid-debugger)
* [Best README Template](https://github.com/othneildrew/Best-README-Template)
