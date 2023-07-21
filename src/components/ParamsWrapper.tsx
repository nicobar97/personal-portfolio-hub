import React from 'react';
import { useParams } from 'react-router-dom';

type Props = {
  paramKey: string;
  children: (paramValue: string) => React.ReactElement | null;
};

const ParamWrapper: React.FC<Props> = (props: Props) => {
  const params = useParams();
  const paramValue = params[props.paramKey];

  return props.children(paramValue!);
};

export default ParamWrapper;
