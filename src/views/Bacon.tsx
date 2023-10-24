import styled from 'styled-components';
import { MobileFrame } from '../components/misc/MobileFrame';
import { AnimatedBox } from '../components/animations/AnimatedBox';
import { AnimateFade } from '../components/animations/Animations';
import { useState } from 'react';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  left: 0;
  gap: 0rem;
  right: 0;
  margin: 0 auto;
  overflow-x: hidden;
  margin-top: 0.5rem;
  padding: 1.5rem;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;

const MainTitle = styled.h1`
  margin: 0rem;
`;

export const Bacon: React.FC = () => (
  <>
    <AnimateFade>
      <Content>
        <MobileFrame>
          <AnimatedBox>
            <MainTitle>Bacon</MainTitle>
            Bacon ipsum dolor amet pig beef pancetta, filet mignon burgdoggen porchetta landjaeger
            bacon spare ribs ground round boudin corned beef tri-tip frankfurter fatback. Flank
            burgdoggen ribeye jowl landjaeger. Kielbasa chislic cupim, drumstick pork hamburger
            ribeye jowl landjaeger shank. Doner jowl short ribs meatball sirloin ribeye salami strip
            steak shank kielbasa. Short loin burgdoggen rump tongue pork salami frankfurter tail
            jerky ball tip swine hamburger spare ribs jowl brisket. Chislic boudin bresaola ham
            hock, swine shank filet mignon biltong tri-tip spare ribs ham ground round buffalo strip
            steak frankfurter. Chislic shank jowl, prosciutto short loin jerky salami kielbasa
            turducken. Turducken leberkas corned beef pork belly, strip steak picanha cupim
            burgdoggen jowl venison pig alcatra ribeye bresaola. Doner ground round shoulder brisket
            short ribs pig, landjaeger jerky sausage prosciutto flank beef strip steak ribeye. Chuck
            alcatra bresaola, venison chislic drumstick shank hamburger kielbasa filet mignon
            ribeye. Frankfurter shoulder shankle sausage tenderloin boudin pork tongue porchetta
            swine shank capicola turkey. Tail bacon landjaeger chicken cow. Buffalo beef corned beef
            tail. Prosciutto ham hock tri-tip, ham pork shankle picanha chislic. Pastrami andouille
            hamburger, pork loin sirloin shank porchetta meatball kielbasa swine salami jowl cow.
            T-bone ham hock strip steak, landjaeger turkey flank turducken short ribs jerky ground
            round cow pork chop. Picanha t-bone leberkas swine, porchetta tenderloin kevin sirloin
            ham pork belly ball tip biltong tongue short loin. Sausage porchetta flank, doner chuck
            andouille ribeye landjaeger pork pastrami. Pork belly tri-tip tenderloin pancetta turkey
            bresaola flank sirloin shank chislic prosciutto bacon meatball. Pancetta pork chop
            bresaola, prosciutto sausage jerky leberkas ham hock cupim corned beef. Spare ribs
            tongue pig, shankle tail bresaola chicken jowl sirloin salami tri-tip t-bone beef ribs.
            Short ribs strip steak chislic chuck corned beef andouille rump ground round venison
            frankfurter capicola. Brisket porchetta biltong shank burgdoggen prosciutto ribeye
            pastrami kevin. Biltong pork loin tongue, bacon shankle ham strip steak. Rump tenderloin
            flank tri-tip corned beef, leberkas ham hock. Flank filet mignon bresaola pork belly,
            frankfurter chicken shank capicola. Jowl ribeye chicken, alcatra ground round corned
            beef drumstick. Capicola filet mignon chuck cupim sausage. Picanha kevin flank, ham beef
            t-bone biltong. Shoulder strip steak beef chicken pancetta venison beef ribs ball tip
            jowl frankfurter. Landjaeger pig ball tip, kielbasa picanha shoulder fatback. Prosciutto
            porchetta t-bone meatloaf pork chop sirloin ham sausage. Turducken filet mignon corned
            beef spare ribs cow, biltong pork belly frankfurter drumstick tail. Leberkas chicken
            filet mignon brisket ham buffalo tail bresaola meatloaf venison andouille boudin
            meatball cow short ribs. Bacon ham hock strip steak picanha swine pork chop chuck
            fatback. Rump swine kevin, capicola drumstick pork chop pig pork belly. Ground round
            pork belly short loin jowl capicola meatloaf. Pastrami kielbasa shoulder alcatra brisket
            tongue tail cupim flank meatball. Boudin tongue tri-tip jowl shankle ball tip shank
            kevin strip steak cow shoulder ground round pastrami. Doner pork loin tri-tip sausage
            bresaola shankle prosciutto, biltong corned beef cow landjaeger turkey fatback. Cupim
            short loin doner turducken chicken ball tip alcatra shank bresaola short ribs spare ribs
            meatloaf rump landjaeger. Jerky shank cupim, drumstick tail venison frankfurter. Tail
            chislic strip steak jowl meatloaf, porchetta shank. Strip steak drumstick pork swine
            turkey cupim short ribs chuck corned beef t-bone hamburger beef shank landjaeger pig.
            Burgdoggen meatloaf pancetta spare ribs, turkey strip steak sausage kielbasa frankfurter
            tail doner meatball buffalo. Jerky ball tip chuck bacon pastrami pig burgdoggen. Ribeye
            meatball leberkas, capicola chislic pastrami sirloin meatloaf ball tip frankfurter tail
            tongue buffalo. Bacon pastrami beef turducken jerky. Buffalo meatloaf leberkas sausage,
            cupim porchetta fatback frankfurter. Short loin turducken jowl, doner ground round
            tongue prosciutto. Pastrami alcatra filet mignon, hamburger sirloin frankfurter pork
            belly bresaola beef ribs ham t-bone doner drumstick. Kevin beef ribs ground round turkey
            alcatra capicola leberkas chuck biltong corned beef tenderloin. Beef ribs doner tri-tip,
            andouille shankle pastrami chicken swine bacon ball tip alcatra. Sausage pork loin
            tongue, ribeye prosciutto hamburger pig tail tenderloin. Spare ribs beef swine boudin
            chicken shankle strip steak meatball andouille buffalo ham. Prosciutto tenderloin short
            loin drumstick meatloaf cow corned beef venison. Landjaeger burgdoggen brisket chislic
            tenderloin ham hock jowl porchetta corned beef cow shoulder frankfurter. Prosciutto
            landjaeger andouille, porchetta bresaola salami pastrami. Doner kielbasa salami ground
            round pancetta short loin. Prosciutto leberkas beef ribs doner.
          </AnimatedBox>
        </MobileFrame>
      </Content>
    </AnimateFade>
  </>
);
