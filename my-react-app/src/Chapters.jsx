import character1 from '../images/chap1.png';
import character2 from '../images/chap2.png';
import character3 from '../images/chap3.png';
import character4 from '../images/chap4.png';
import character5 from '../images/chap5.png';

import pixarV from '../images/pixar.mp4';
// import starwarV from '../Videos/star-wars.mp4';
// import disneyV from '../Videos/disney.mp4';
// import marvelV from '../Videos/marvel.mp4';
// import nationalGeographicV from '../Videos/national-geographic.mp4';

  const genere = [
    {
      id: 1,
      title: 'chapter 1',
      image: character1,
      video: pixarV,
    },
    {
      id: 2,
      title: 'chapter 2',
      image: character2,
      video: pixarV,
    },
    {
      id: 3,
      title: 'chapter 3',
      image: character3,
      video: pixarV,
    },
    {
      id: 4,
      title: 'chapter 4',
      image: character4,
      video: pixarV,
    },
    {
      id: 5,
      title: 'chapter 5',
      image: character5,
      video: pixarV,
    },
  ];
  const genereJSON= JSON.stringify(genere)
  export {
    genere,
    genereJSON
  }