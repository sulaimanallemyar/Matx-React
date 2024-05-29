import React from 'react';
export interface ICondition {
  condition?: boolean;
  children?: any;
  conditionNotTrue?: any;
}

export const Condition = ({ condition, children = <></>, conditionNotTrue }: ICondition) => {
  // eslint-disable-next-line no-extra-boolean-cast
  if (!!condition) return children;
  else {
    if (conditionNotTrue) return conditionNotTrue;
    return <></>;
  }
};
