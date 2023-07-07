import React from "react";
import { Svg, Path } from "react-native-svg";

const Icon = ({ name, color, width, height, style, marginleft }) => {
  const getIcon = () => {
    switch (name) {
      case 'facebook':
        return (
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={width} height={height} style={[style, {marginLeft: marginleft}]}>
            <Path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" fill={color} />
          </Svg>
        );
      case 'apple':
        return (
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={width} height={height} style={[style, {marginLeft: marginleft}]}>
            <Path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill={color} />
          </Svg>
        );
      case 'email':
        return (
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={width} height={height} style={[style, {marginLeft: marginleft}]}>
            <Path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" fill={color}/>
          </Svg>
        );
      default:
        return null;
    }
  };

  return getIcon();
};

export default Icon;


