import Threemap from '../../components/ThreeMap';
import styles from './map.less';
export default function MapExamole() {
  return (
    <div className={styles.map}>
      <div className={styles.three}>
        <Threemap />
      </div>
    </div>
  );
}
