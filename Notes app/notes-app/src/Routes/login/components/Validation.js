// import React from 'react'
import * as yup from 'yup';

export const schema = yup.object().shape({
  reg: yup.string().required(),
  pas: yup.string().required().min(5),
  cpas: yup.string().required().min(5)
});


