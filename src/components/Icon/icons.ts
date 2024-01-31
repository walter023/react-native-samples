import { BezierCurve } from '../../assets/menu/BezierCurve.tsx';
import Axis from '../../assets/menu/Axis.tsx';
import { Length } from '../../assets/menu/Length.tsx';
import { Turret } from '../../assets/menu/LaserTurret.tsx';
import { BackButton } from '../../assets/menu/BackButton.tsx';
import Coord from '../../assets/menu/Coord.tsx';
import Circles from '../../assets/menu/Circles.tsx';

const Icons: { [key: string]: any } = {
  bezierCurve: BezierCurve,
  axis: Axis,
  length: Length,
  turret: Turret,
  backButton: BackButton,
  coord: Coord,
  circles: Circles,
};

export default Icons;
