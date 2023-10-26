import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Routes } from '../../Routes';
import { useNavigate } from 'react-router-dom';
import articleIcon from '../../assets/icons/article.png';
import mangaIcon from '../../assets/icons/manga.png';

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
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.05,
      y: { stiffness: 1000 },
    },
  },
};

const IconContainer = styled.button<{ background: string }>`
  display: inline-flex;
  width: 3rem;
  height: 3rem;
  margin: 0rem;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.background};
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  box-shadow: inset ${(props) => props.theme.background}99 2px 2px 30px;
`;

const IconTitle = styled.h1`
  margin: 0rem;
  color: black;
  opacity: 0.2;
  padding: 0.2rem;
  font-size: 0.5rem;
  position: relative;
  top: 0.1rem;
  margin-right: 0.2rem;
`;

const Icon = styled.img`
  position: relative;
  width: 1.5rem;
  left: 0.3rem;
  top: 0.3rem;
  padding: 0.2rem;
  transform: rotate(30deg) scale(1.3);
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
            <IconContainer background="indianred">
              <IconTitle>Articles</IconTitle>
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
          <MenuItem onClick={() => navigate(Routes.MangaList)}>
            <IconContainer background="lightyellow">
              <IconTitle>Mangas</IconTitle>
              <Icon src={mangaIcon} />
            </IconContainer>
            <ItemLabel>Manga Reader</ItemLabel>
          </MenuItem>
        </motion.li>
        <motion.li
          variants={menuItemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MenuItem onClick={() => navigate(Routes.OpCardList)}>
            <IconContainer background="lightblue">
              <IconTitle>OPCards</IconTitle>
              <Icon src={mangaIcon} />
            </IconContainer>
            <ItemLabel>Card List</ItemLabel>
          </MenuItem>
        </motion.li>
        <motion.li
          variants={menuItemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MenuItem onClick={() => navigate(Routes.TrainTable.replace(':placeId', '1728'))}>
            <IconContainer background="indianred">
              <IconTitle>Trains</IconTitle>
              <Icon src={articleIcon} />
            </IconContainer>
            <ItemLabel>Train List</ItemLabel>
          </MenuItem>
        </motion.li>
      </motion.ul>
    </>
  );
};
