import { motion } from 'framer-motion';

type Props = {
  trigger: boolean;
  children: React.ReactNode;
};

export const AnimateFadeInDown: React.FC<Props> = (props: Props) => (
  <motion.div
    initial={{ opacity: 0, translateY: -20 }}
    animate={{ opacity: props.trigger ? 1 : 0, translateY: props.trigger ? 0 : -20 }}
    transition={{ duration: 0.5 }}
  >
    {props.children}
  </motion.div>
);

export const AnimateFadeIn: React.FC<Props> = (props: Props) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: props.trigger ? 1 : 0 }}
    transition={{ duration: 0.5 }}
  >
    {props.children}
  </motion.div>
);
