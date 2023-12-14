import React from 'react';
import {useConfettisService} from '../../services/confettis-service';
import {Confettis} from './confettis';

const ConfettisContainer = () => {
  const {showConfettis} = useConfettisService();

  return <>{showConfettis && <Confettis />}</>;
};

export default ConfettisContainer;
