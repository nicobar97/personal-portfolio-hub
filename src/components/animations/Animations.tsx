import { motion } from 'framer-motion';

type Props = {
  trigger: boolean;
  children: React.ReactNode;
};

type Props2 = {
  children: React.ReactNode;
};

export const AnimateFadeInDown: React.FC<Props> = (props: Props) => (
  <motion.div
    initial={{ opacity: 0, translateY: 0 }}
    animate={{ opacity: props.trigger ? 1 : 0, translateY: props.trigger ? 0 : -40 }}
    transition={{ duration: 0.5 }}
  >
    {props.children}
  </motion.div>
);

export const AnimateFadeIn: React.FC<Props> = (props: Props) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: props.trigger ? 1 : 0 }}
    transition={{ duration: 0.2 }}
  >
    {props.children}
  </motion.div>
);

export const AnimateFade: React.FC<Props2> = (props: Props2) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
    {props.children}
  </motion.div>
);
{
  /* <motion.div
initial={{ opacity: 0, translateY: 0 }}
animate={{ opacity: props.trigger ? 1 : 0, translateY: props.trigger ? 30 : -30 }}
transition={{ duration: 0.5 }}
> */
}
