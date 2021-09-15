import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Styles from './Styles';

const HomeScreen = () => {
  const [squares, setSquares] = useState([]);
  const [circles, setCircles] = useState([]);
  const [dimension, setDimension] = useState({x: 0, y: 0, height: 0, width: 0});

  const setDimensions = event => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setDimension({x, y, height, width});
  };

  const handleAddSquare = () => {
    const width = Math.floor(Math.random() * (50 - 20) + 20);
    const x = Math.floor(Math.random() * (dimension.width - width));
    const y = Math.floor(Math.random() * (dimension.height - width));
    const square = {
      top: y,
      left: x,
      width: width,
      height: width,
      rightX: x + width,
      bottomY: y + width,
    };
    const isOverlappingCircle = checkIfOverlapsAnyCircle(square, false);
    const isOverlappingSquare = checkIfOverlapsAnySquare(square, false);
    if (isOverlappingCircle || isOverlappingSquare) {
      Alert.alert(
        'The new square generated randomly overlaps previos elements.',
      );
    } else {
      setSquares(squares.concat(square));
    }
  };

  const handleAddCircle = () => {
    const width = Math.floor(Math.random() * (50 - 20) + 20);
    const x = Math.floor(Math.random() * (dimension.width - width));
    const y = Math.floor(Math.random() * (dimension.height - width));
    const circle = {
      top: y,
      left: x,
      width: width,
      height: width,
      borderRadius: width / 2,
      centerX: x + width / 2,
      centerY: y + width / 2,
    };
    const isOverlappingCircle = checkIfOverlapsAnyCircle(circle, true);
    const isOverlappingSquare = checkIfOverlapsAnySquare(circle, true);
    if (isOverlappingCircle || isOverlappingSquare) {
      Alert.alert(
        'The new circle generated randomly overlaps previos elements.',
      );
    } else {
      setCircles(circles.concat(circle));
    }
  };

  const checkIfOverlapsAnySquare = (drawable, isCircle) => {
    let isOverlapping = false;
    for (let index = 0; index < squares.length; index++) {
      const square = squares[index];
      if (isCircle) {
        const distance = getDistanceForNearestPoint(drawable, square);
        if (distance < drawable.width) {
          isOverlapping = true;
          break;
        }
      } else {
        if (
          !(
            drawable.left > square.rightX ||
            square.left > drawable.rightX ||
            drawable.top > square.bottomY ||
            square.top > drawable.bottomY
          )
        ) {
          isOverlapping = true;
          break;
        }
      }
    }
    return isOverlapping;
  };

  const checkIfOverlapsAnyCircle = (drawable, isCircle) => {
    let isOverlapping = false;
    for (let index = 0; index < circles.length; index++) {
      const circle = circles[index];
      if (isCircle) {
        const distance = getDistance(
          {x: circle.centerX, y: circle.centerY},
          {x: drawable.centerX, y: drawable.centerY},
        );
        if (distance < circle.width + drawable.width) {
          isOverlapping = true;
          break;
        }
      } else {
        const distance = getDistanceForNearestPoint(circle, drawable);
        if (distance < circle.width) {
          isOverlapping = true;
          break;
        }
      }
    }
    return isOverlapping;
  };

  const getDistanceForNearestPoint = (circle, square) => {
    const nearestPoint = getNearestPoint(
      circle.centerX,
      circle.centerY,
      square.top,
      square.left,
      square.rightX,
      square.bottomY,
    );
    const distance = getDistance(
      {x: circle.centerX, y: circle.centerY},
      {x: nearestPoint.x, y: nearestPoint.y},
    );
    return distance;
  };

  const getNearestPoint = (centerX, centerY, top, left, right, bottom) => {
    const x = Math.max(left, Math.min(centerX, right));
    const y = Math.max(top, Math.min(centerY, bottom));
    return {x, y};
  };

  const getDistance = (firstPoint, secondPoint) => {
    return Math.sqrt(
      Math.pow(firstPoint.x - secondPoint.x, 2) +
        Math.pow(firstPoint.y - secondPoint.y, 2),
    );
  };

  const drawChildren = () => {
    let elements = [];
    squares.map((square, index) =>
      elements.push(
        <View style={[Styles.square, square]} key={`Square_${index}`} />,
      ),
    );
    circles.map((circle, index) =>
      elements.push(
        <View style={[Styles.square, circle]} key={`Circle_${index}`} />,
      ),
    );
    return elements;
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.buttonContainer}>
        <TouchableOpacity style={Styles.button} onPress={handleAddSquare}>
          <Text style={Styles.buttonText}>Add a square</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.button} onPress={handleAddCircle}>
          <Text style={Styles.buttonText}>Add a circle</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.container} onLayout={setDimensions}>
        {drawChildren()}
      </View>
    </View>
  );
};

export default HomeScreen;
