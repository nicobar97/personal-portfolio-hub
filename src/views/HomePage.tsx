import styled from 'styled-components';
import logoLight from '../../src/assets/images/logo_light.png';
import { MobileFrame } from '../components/MobileFrame';
import { NavigationBar } from '../components/NavigationBar';

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2rem;
  background-color: ${(props) => props.theme.colors.white};
  padding: 1rem;
  box-shadow: ${(props) => props.theme.hexToRgbA(props.theme.colors.black, 0.2)} 0px 7px 20px 0px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  inset: 3rem 0px 3rem;
  margin-top: 0.5rem;
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2rem;
  background-color: ${(props) => props.theme.colors.white};
  padding: 1rem;
  box-shadow: ${(props) => props.theme.hexToRgbA(props.theme.colors.black, 0.1)} 0px 7px 20px 0px;
`;

const Logo = styled.img`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex-shrink: 0;
  width: 8rem;
`;

export const HomePage: React.FC = () => {
  return (
    <>
      <Content>
        <MobileFrame>
          <div>
            Bacon ipsum dolor amet ham swine meatball meatloaf, turducken turkey sausage fatback.
            Turducken short loin flank, pork beef ribs andouille turkey jerky shankle venison. Cow
            kevin venison ham capicola pork chop. Tri-tip meatloaf jerky ham hock alcatra t-bone
            tenderloin swine filet mignon biltong chuck pancetta. Landjaeger venison ribeye chislic
            chuck shankle. Ham hock short ribs buffalo meatball jowl flank ribeye salami boudin.
            Pork strip steak drumstick corned beef swine pancetta, cow porchetta ham tenderloin.
            Tongue tri-tip swine tenderloin andouille beef capicola cupim ball tip turducken
            hamburger meatball alcatra rump filet mignon. T-bone kielbasa meatloaf landjaeger
            burgdoggen bresaola turducken swine pork loin porchetta jerky ham. Turkey venison ground
            round pork picanha jerky filet mignon turducken pastrami ham t-bone chicken ham hock.
            Corned beef pork loin alcatra, pork belly biltong tail hamburger pig ham kielbasa chuck
            drumstick venison ground round bresaola. Chuck turducken pancetta ham hock pork. Chislic
            tongue filet mignon bresaola andouille pastrami. Porchetta hamburger beef ribs short
            ribs cow cupim alcatra pork loin bacon flank bresaola pork chop kielbasa ribeye
            leberkas. Spare ribs buffalo shoulder frankfurter meatloaf strip steak tongue fatback.
            Sirloin drumstick boudin tenderloin pig filet mignon. Cupim porchetta ground round,
            strip steak short ribs turkey fatback prosciutto bacon swine frankfurter boudin chislic
            turducken kevin. Cupim shank pork belly boudin, jowl hamburger chislic. Jerky short loin
            doner pancetta, kevin landjaeger cupim. Shankle venison bacon biltong, strip steak pork
            loin capicola meatloaf kevin pork sausage boudin cow. Jowl turducken venison ribeye
            fatback. Tail meatloaf ground round, hamburger frankfurter sirloin turkey picanha filet
            mignon pork loin turducken pork chop. Pastrami ribeye corned beef flank spare ribs rump
            chislic shoulder leberkas, tongue shankle kielbasa. Chuck ball tip pork loin, kevin tail
            jerky brisket tenderloin. Bacon andouille chislic short loin swine doner meatloaf ribeye
            t-bone jerky strip steak filet mignon. Pastrami kevin biltong tail flank chuck ham hock
            turducken andouille. Frankfurter pig bresaola pork chop. Flank shankle rump, shoulder
            filet mignon turducken pork loin boudin tenderloin doner prosciutto. Sausage tongue
            swine boudin. Ball tip drumstick porchetta flank shoulder prosciutto, andouille brisket
            tri-tip shankle pig tenderloin. Ham hock sirloin beef ribs, sausage pork pork chop
            biltong ball tip cupim meatball filet mignon short loin doner. Shankle filet mignon pork
            loin, corned beef chislic salami turducken meatloaf buffalo leberkas short ribs jerky
            swine bresaola. Tenderloin swine pig tri-tip tail picanha. Filet mignon ham hock
            porchetta pork chop, andouille meatloaf fatback chuck strip steak alcatra spare ribs
            salami tri-tip beef. Shank pig jerky, meatloaf pastrami jowl burgdoggen drumstick rump
            buffalo flank short ribs ham hock turkey t-bone. T-bone corned beef salami alcatra ham
            hock, short ribs chicken ham pastrami shank spare ribs beef ribs cupim turducken
            andouille. Hamburger tail ham hock, sirloin porchetta kevin pork chop landjaeger chicken
            spare ribs pig flank andouille prosciutto. Ribeye shank rump, ground round bresaola
            sausage chislic. Pork chop swine strip steak burgdoggen pork ribeye spare ribs
            landjaeger bresaola pastrami tenderloin pork loin drumstick tri-tip. Kevin pork belly
            chuck, cupim turducken fatback pork turkey. Beef fatback ground round capicola, t-bone
            porchetta landjaeger. Cupim frankfurter t-bone swine capicola ground round tenderloin
            kielbasa. Bacon pancetta sirloin tri-tip pork chop meatball hamburger andouille biltong.
            Brisket short ribs ball tip, flank t-bone biltong rump shoulder pancetta pork bacon
            ground round sausage prosciutto chislic. Hamburger beef ribs boudin ground round pork
            chop, sausage ham beef shoulder shank pork belly jerky tri-tip filet mignon porchetta.
            Kielbasa tongue prosciutto cupim turkey bacon flank landjaeger. Tri-tip meatloaf beef,
            porchetta shankle boudin ground round cupim drumstick pork belly. Flank shoulder
            meatball, jerky chicken boudin brisket drumstick sausage. Meatball brisket turducken
            filet mignon. Hamburger short ribs shoulder, pork belly pork chop frankfurter meatloaf
            cow ground round turducken meatball beef ribs strip steak boudin beef. Buffalo capicola
            kielbasa leberkas t-bone shankle ground round kevin rump tail pancetta boudin bacon
            landjaeger. Tail cupim beef pig spare ribs ground round pork chop buffalo. Fatback
            ground round turkey jowl cow spare ribs frankfurter buffalo meatball hamburger. Alcatra
            shankle chuck tenderloin tongue capicola buffalo meatball burgdoggen pig drumstick
            prosciutto leberkas. Turducken pancetta leberkas kevin pork chop t-bone cow, salami
            ribeye landjaeger short ribs hamburger. Pork chop picanha short loin, buffalo pancetta
            landjaeger meatloaf boudin. Biltong jowl fatback venison chuck ball tip drumstick
            shankle.
          </div>
        </MobileFrame>
      </Content>

      <Header key="header">
        <Logo src={logoLight} />
      </Header>

      <Footer key="footer">
        <MobileFrame>
          <NavigationBar />
        </MobileFrame>
      </Footer>
    </>
  );
};
