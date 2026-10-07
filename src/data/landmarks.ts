// Twelve real Detroit places, each with a fantasy twist. Every fact is a public, well-documented fact.
import type { Stat } from '../engine/engine.ts'

export type Choice = {
  label: string
  stat: Stat
  dc: number
  win: string
  lose: string
}

export type Landmark = {
  id: string
  realName: string
  questName: string
  district: string
  icon: string
  scene: string
  foe: string
  choices: [Choice, Choice, Choice]
  fact: string
}

export const LANDMARKS: Landmark[] = [
  {
    id: 'belle-isle',
    realName: 'Belle Isle',
    questName: 'The Enchanted Isle',
    district: 'Detroit River',
    icon: '🌿',
    foe: 'the River Serpent',
    scene:
      'Fog rolls off the Detroit River as you cross the MacArthur Bridge onto Belle Isle. The glass dome of the old conservatory glows green in the dark. Something long and silver coils around the bridge behind you. The River Serpent has cut off your way back.',
    choices: [
      { label: 'Stand your ground and wrestle the serpent off the bridge', stat: 'might', dc: 12, win: 'You grab the serpent by its slick neck and heave it back into the river with a mighty splash.', lose: 'The serpent is slicker than it looks. It slips your grip and knocks you flat.' },
      { label: 'Read the old river markers to find the serpent’s weakness', stat: 'mind', dc: 11, win: 'The markers say the serpent fears the light of the conservatory dome. You lead it into the glow and it melts into mist.', lose: 'The markers are worn smooth. You read them wrong and the serpent circles closer.' },
      { label: 'Speak calmly and promise the serpent the island will stay a park forever', stat: 'heart', dc: 10, win: 'The serpent lowers its head. It only wanted the island protected. It slides away into the deep.', lose: 'The serpent hisses. Words alone will not calm it tonight.' },
    ],
    fact: 'Belle Isle is a 982-acre island park in the Detroit River. That makes it bigger than Central Park in New York City.',
  },
  {
    id: 'spirit-of-detroit',
    realName: 'The Spirit of Detroit',
    questName: 'The Waking Giant',
    district: 'Downtown, Woodward Avenue',
    icon: '🗿',
    foe: 'the Shadow Thief',
    scene:
      'The great bronze statue stirs. It lifts the golden sphere in one hand and the small family in the other, and its eyes burn like twin lamps. A Shadow Thief has stolen the city’s charter from the building behind it. The giant asks you to get it back before the sun rises.',
    choices: [
      { label: 'Chase the thief down Woodward and tackle it', stat: 'might', dc: 11, win: 'You catch the thief at the corner of Jefferson and pin it until the charter falls free.', lose: 'The thief is fast. You lose it in the alleys behind Campus Martius.' },
      { label: 'Study the thief’s footprints to predict where it hides', stat: 'mind', dc: 12, win: 'The prints lead to the old vault under the plaza. You find the charter inside.', lose: 'The prints vanish on the wet pavement and the trail goes cold.' },
      { label: 'Call out to the people of Detroit to form a circle around the block', stat: 'heart', dc: 11, win: 'Hundreds of Detroiters pour into the street and close every exit. The thief surrenders the charter.', lose: 'Only a few people answer tonight. The thief slips through a gap.' },
    ],
    fact: 'The Spirit of Detroit was made by sculptor Marshall Fredericks and dedicated in 1958. When a Detroit team plays for a championship, fans dress the 26-foot statue in a giant team jersey.',
  },
  {
    id: 'hitsville',
    realName: 'Hitsville U.S.A. (Motown Museum)',
    questName: 'The House of a Thousand Songs',
    district: 'West Grand Boulevard',
    icon: '🎤',
    foe: 'the Silence',
    scene:
      'A small blue and white house on West Grand Boulevard hums with music that is not playing. Inside Studio A, a creeping gray fog called the Silence is swallowing every note ever recorded here. If the last song goes quiet, Detroit forgets how to sing.',
    choices: [
      { label: 'Pound the piano until the Silence is driven out', stat: 'might', dc: 12, win: 'You hammer out a beat so strong the walls shake and the fog flees out the door.', lose: 'You hit the keys hard but with no rhythm. The fog only thickens.' },
      { label: 'Find the master tape and play the first hit back', stat: 'mind', dc: 11, win: 'You thread the tape and the first Motown hit roars out. The Silence shatters like glass.', lose: 'You thread the wrong tape. It plays static and the fog laughs.' },
      { label: 'Sing. Just sing, and get everyone in the room to join', stat: 'heart', dc: 10, win: 'Your voice cracks at first, then the whole room joins in. The Silence cannot stand against a choir.', lose: 'You sing alone and the fog swallows the sound.' },
    ],
    fact: 'Berry Gordy started Motown in 1959 with an $800 loan from his family. Stevie Wonder, Diana Ross, Marvin Gaye, and the Jackson 5 all recorded hits inside this one small house.',
  },
  {
    id: 'eastern-market',
    realName: 'Eastern Market',
    questName: 'The Goblin Market',
    district: 'Eastern Market District',
    icon: '🍎',
    foe: 'the Goblin Merchant',
    scene:
      'Saturday morning at Eastern Market, but every stall is run by a goblin. The Goblin Merchant has swapped all the real food for painted stones. Families are heading home with baskets full of rocks. You have to break the trick before the market closes.',
    choices: [
      { label: 'Flip the Goblin Merchant’s table and expose the stones', stat: 'might', dc: 11, win: 'The table crashes over. Stones roll everywhere and the crowd sees the trick. The goblins scatter.', lose: 'The table is bolted down. The goblins cackle at you.' },
      { label: 'Spot the one real apple and prove the rest are fake', stat: 'mind', dc: 12, win: 'You hold up the one real apple next to a painted stone. The crowd gasps and the spell breaks.', lose: 'Every stone looks like an apple to you. The goblins keep selling.' },
      { label: 'Rally the real farmers to set up their stalls right next to the goblins', stat: 'heart', dc: 10, win: 'The real farmers roll in with real food. Nobody buys a rock again, and the goblins pack up.', lose: 'The farmers are tired and slow to come. The goblins sell out first.' },
    ],
    fact: 'Eastern Market has been a working public market at this spot since 1891. It is one of the oldest and largest public markets in the United States.',
  },
  {
    id: 'the-fist',
    realName: 'The Fist (Monument to Joe Louis)',
    questName: 'The Iron Hand',
    district: 'Jefferson and Woodward',
    icon: '✊',
    foe: 'the Doubt Golem',
    scene:
      'The giant bronze fist swings slowly on its chains at the center of the intersection. A hulking Doubt Golem made of broken brick blocks the crosswalk and whispers that you will never win. Every whisper makes the fist swing slower. You have to silence the golem.',
    choices: [
      { label: 'Step in the ring and go toe to toe with the golem', stat: 'might', dc: 13, win: 'You take a hit, then land a clean one. The golem crumbles to dust and the fist swings free.', lose: 'The golem is heavier than it looks. It shoves you back into the street.' },
      { label: 'Find the one cracked brick that holds the golem together', stat: 'mind', dc: 11, win: 'You spot the cracked brick behind its knee, tap it, and the whole golem falls apart.', lose: 'There are too many cracks. You pick the wrong one.' },
      { label: 'Refuse to listen and keep walking straight through the whispers', stat: 'heart', dc: 11, win: 'You do not flinch. The golem has no power over someone who does not doubt. It fades to nothing.', lose: 'One whisper gets in. You hesitate, and the golem grows.' },
    ],
    fact: 'The Fist honors boxer Joe Louis, who grew up in Detroit. He held the world heavyweight title for almost 12 years, from 1937 to 1949, the longest reign in heavyweight history.',
  },
  {
    id: 'dia',
    realName: 'Detroit Institute of Arts',
    questName: 'The Hall of Living Walls',
    district: 'Midtown, Woodward Avenue',
    icon: '🖼️',
    foe: 'the Paint Wraith',
    scene:
      'Inside Rivera Court the giant murals of Detroit workers begin to move. The painted men and women are climbing out of the walls. A Paint Wraith is pulling them loose so it can wear their colors. If the murals empty out, the city’s story goes blank.',
    choices: [
      { label: 'Hold the painted workers in place with your bare hands', stat: 'might', dc: 12, win: 'You brace against the wall and push the workers back into the paint. The wraith has nothing left to steal.', lose: 'Paint is slippery. The workers slide right past you.' },
      { label: 'Read the mural from left to right and speak its story out loud', stat: 'mind', dc: 10, win: 'As you tell the story, each figure settles back into its place. The wraith starves and vanishes.', lose: 'You start the story in the wrong corner. The figures grow confused.' },
      { label: 'Ask the painted workers what they are afraid of and listen', stat: 'heart', dc: 11, win: 'They are afraid of being forgotten. You promise to bring your class here. They return to the wall, smiling.', lose: 'The wraith shouts over you and the workers cannot hear.' },
    ],
    fact: 'The Detroit Industry Murals were painted by Diego Rivera in 1932 and 1933. They cover 27 panels in Rivera Court and show Detroit auto workers at the Ford Rouge plant.',
  },
  {
    id: 'wright-museum',
    realName: 'Charles H. Wright Museum of African American History',
    questName: 'The Vault of Memory',
    district: 'Midtown, East Warren Avenue',
    icon: '📜',
    foe: 'the Forgetting',
    scene:
      'Under the museum’s great glass dome, the exhibits are going dark one by one. A cold mist called the Forgetting is erasing names from the walls. You can hear the stories fading. You have one chance to light the dome again.',
    choices: [
      { label: 'Crank the old generator in the basement by hand', stat: 'might', dc: 12, win: 'You crank until your arms burn. The dome blazes with light and the mist is gone.', lose: 'The crank jams. You cannot force it alone.' },
      { label: 'Say the names on the walls out loud before they vanish', stat: 'mind', dc: 10, win: 'You read name after name. Every one you say rewrites itself in gold. The Forgetting flees.', lose: 'You stumble on a name and the mist takes two more.' },
      { label: 'Hold hands with the visitors and tell one story you know by heart', stat: 'heart', dc: 11, win: 'Your story lights one exhibit. Then everyone tells theirs. The whole dome glows.', lose: 'Nobody else speaks up. One story is not enough tonight.' },
    ],
    fact: 'Dr. Charles H. Wright was a Detroit doctor who founded this museum in 1965. Today it is one of the largest museums of African American history in the world.',
  },
  {
    id: 'michigan-central',
    realName: 'Michigan Central Station',
    questName: 'The Sleeping Tower',
    district: 'Corktown',
    icon: '🚂',
    foe: 'the Rust King',
    scene:
      'The 18-story station rises over Corktown, every window lit again after decades dark. But in the grand hall the Rust King sits on a throne of old train wheels. He wants the building empty and broken like it used to be. The first new train is due in ten minutes.',
    choices: [
      { label: 'Knock the Rust King off his throne of wheels', stat: 'might', dc: 12, win: 'You shove the throne and the wheels roll out the door. The Rust King falls apart without his seat.', lose: 'The wheels are heavy and the king laughs as you strain.' },
      { label: 'Find the original 1913 blueprints and show him the building was built to last', stat: 'mind', dc: 11, win: 'You unroll the blueprints. The Rust King sees the stone will outlive him and he crumbles.', lose: 'The blueprints are faded. The king waves them away.' },
      { label: 'Invite the neighborhood in to fill the hall with people', stat: 'heart', dc: 10, win: 'Corktown pours in. Music, food, kids running. The Rust King cannot stand a full room and he fades.', lose: 'It is late and cold. Only a few people come.' },
    ],
    fact: 'Michigan Central Station opened in 1913 and was the tallest train station in the world. It sat empty from 1988 until Ford restored it and reopened it in June 2024.',
  },
  {
    id: 'gateway-to-freedom',
    realName: 'Gateway to Freedom Memorial, Hart Plaza',
    questName: 'The Midnight Crossing',
    district: 'Detroit Riverfront',
    icon: '⭐',
    foe: 'the Chain Hound',
    scene:
      'A cold night on the riverfront. Across the water the lights of Canada shine. A family is waiting at the bronze memorial for a boat to carry them to freedom, but a Chain Hound prowls the dock between them and the river. You are the only one who can clear the way.',
    choices: [
      { label: 'Draw the hound away and fight it on the open plaza', stat: 'might', dc: 12, win: 'You lure the hound into the open and drive it off with a broken oar. The family makes the boat.', lose: 'The hound is quick and its chains bite. You fall back.' },
      { label: 'Find the hidden signal lantern and flash the code across the river', stat: 'mind', dc: 11, win: 'You find the lantern and flash the signal. A second boat arrives upstream, far from the hound.', lose: 'You flash the wrong pattern. No boat comes.' },
      { label: 'Stand between the hound and the family and do not move', stat: 'heart', dc: 11, win: 'You plant your feet. The hound snarls, then backs down. The family slips past you into the boat.', lose: 'The hound lunges and you have to jump aside.' },
    ],
    fact: 'Detroit’s secret code name on the Underground Railroad was Midnight. Crossing the Detroit River to Canada meant freedom. The Gateway to Freedom memorial by sculptor Ed Dwight has a twin, the Tower of Freedom, across the river in Windsor.',
  },
  {
    id: 'black-bottom',
    realName: 'Black Bottom and Paradise Valley',
    questName: 'The Lost Quarter',
    district: 'East of Downtown (now Lafayette Park and I-375)',
    icon: '🎷',
    foe: 'the Concrete Dragon',
    scene:
      'Beneath the freeway you find a door that should not be there. Behind it a whole neighborhood glows: jazz clubs, barbershops, hotels, all alive again. A Concrete Dragon is pouring gray stone over the street to bury it a second time. You can still hear a saxophone playing.',
    choices: [
      { label: 'Break the dragon’s concrete pour with a sledgehammer', stat: 'might', dc: 12, win: 'You smash the wet concrete again and again until the dragon runs dry and slinks away.', lose: 'The concrete sets faster than you can swing.' },
      { label: 'Map the old street grid and show the dragon the neighborhood was never gone', stat: 'mind', dc: 11, win: 'You draw Hastings Street from memory. The map glows, and the dragon cannot bury what is remembered.', lose: 'You cannot recall the street names fast enough.' },
      { label: 'Walk into the jazz club and get the band to play louder', stat: 'heart', dc: 10, win: 'The band plays so loud the concrete cracks and the dragon flees from the sound of joy.', lose: 'The band is scared and the music fades.' },
    ],
    fact: 'Black Bottom was named for its dark, rich soil, not its people. By the 1940s it and Paradise Valley held hundreds of Black-owned businesses and famous jazz clubs. The neighborhood was torn down in the 1950s and 60s to build a freeway and new housing.',
  },
  {
    id: 'heidelberg',
    realName: 'The Heidelberg Project',
    questName: 'The Street of Polka Dots',
    district: 'East Side, Heidelberg Street',
    icon: '🎨',
    foe: 'the Gray Painter',
    scene:
      'Heidelberg Street bursts with color: houses covered in polka dots, stuffed animals, clocks, shoes and painted doors. But the Gray Painter is walking down the block with a bucket, turning every house plain gray. Three houses are left.',
    choices: [
      { label: 'Grab the gray bucket and dump it in the gutter', stat: 'might', dc: 11, win: 'You wrestle the bucket free and pour the gray paint down the drain. The Painter has nothing left.', lose: 'The Painter holds on tight and splashes gray on your sleeve.' },
      { label: 'Figure out the pattern of the polka dots and paint the next one yourself', stat: 'mind', dc: 12, win: 'You see the pattern and paint the next dot. The Painter freezes. It cannot paint over art that is still being made.', lose: 'You paint a dot in the wrong spot and the Painter laughs.' },
      { label: 'Hand brushes to every kid on the block', stat: 'heart', dc: 10, win: 'Twenty kids paint twenty colors at once. The Gray Painter cannot keep up and gives up.', lose: 'The kids are inside. The street is empty tonight.' },
    ],
    fact: 'Artist Tyree Guyton started the Heidelberg Project in 1986 on the street where he grew up. He turned empty houses and found objects into outdoor art, and people from all over the world come to see it.',
  },
  {
    id: 'fox-theatre',
    realName: 'The Fox Theatre',
    questName: 'The Golden Palace',
    district: 'Downtown, Woodward Avenue',
    icon: '🎭',
    foe: 'the Curtain Phantom',
    scene:
      'The Fox marquee blazes over Woodward. Inside, the giant golden lobby is packed for the show of the year. But a Curtain Phantom has locked the great red curtain shut and the crowd is getting restless. The show cannot start until the curtain rises.',
    choices: [
      { label: 'Haul on the curtain ropes with everything you have', stat: 'might', dc: 12, win: 'You pull until the ropes groan. The curtain tears free and rises. The crowd roars.', lose: 'The ropes are knotted by magic. They will not budge.' },
      { label: 'Find the phantom’s cue in the old stage manager’s book', stat: 'mind', dc: 11, win: 'The book says the phantom only leaves on the word "places." You call it, and the curtain flies up.', lose: 'The book is in a code you cannot crack in time.' },
      { label: 'Step on stage in front of the curtain and warm up the crowd yourself', stat: 'heart', dc: 11, win: 'You tell one joke, then another. The crowd laughs so loud the phantom loses its grip and the curtain rises.', lose: 'Your first joke bombs. The phantom cackles behind the velvet.' },
    ],
    fact: 'The Fox Theatre opened in 1928 and holds more than 5,000 seats, making it the largest theater in Michigan. It was restored in 1988 and still hosts concerts and shows today.',
  },
]
