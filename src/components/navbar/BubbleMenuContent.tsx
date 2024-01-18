import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Routes } from '../../Routes';
import { useNavigate } from 'react-router-dom';
import articleIcon from '../../assets/icons/article.png';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.05,
      y: { stiffness: 1000 },
    },
  },
};

const IconContainer = styled.button<{ background: string }>`
  width: 3rem;
  height: 3rem;
  margin: 0rem;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.background};
  overflow: hidden;
  box-shadow: inset ${(props) => props.theme.background}99 2px 2px 30px;
`;

const Icon = styled.img`
  margin-top: 0.25rem;
  width: 1.8rem;
  opacity: 0.2;
`;

const MenuItem = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.2rem;
`;

const ItemLabel = styled.div`
  padding: 1rem;
`;

export const BubbleMenuContent = () => {
  const navigate = useNavigate();

  return (
    <>
      <motion.ul variants={variants}>
        <motion.li
          variants={menuItemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MenuItem onClick={() => navigate(Routes.ArticleList)}>
            <IconContainer background="lightblue">
              <Icon src={articleIcon} />
            </IconContainer>
            <ItemLabel>Articles</ItemLabel>
          </MenuItem>
        </motion.li>

        <motion.li
          variants={menuItemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MenuItem onClick={() => navigate(Routes.TrainList)}>
            <IconContainer background="indianred">
              <Icon src={articleIcon} />
            </IconContainer>
            <ItemLabel>Train Tables</ItemLabel>
          </MenuItem>
        </motion.li>

      </motion.ul>
    </>
  );
};
