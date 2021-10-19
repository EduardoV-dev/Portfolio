import { useContext } from "react";
import { appContext } from "../../../hooks/context/AppContext";
import { useSpring } from 'react-spring';
import { manageUIStyle } from "../../../helpers";
import styles from './right.module.scss';
import cn from 'classnames';

const useAnimationsAndClasses = (className?: string) => {
  const { state: { darkMode } } = useContext(appContext);

  const container = cn(styles.content, className);
  const small = cn(styles.content__small, {
    [styles[`content__small-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
  });
  const headline = cn(styles.content__headline, {
    [styles[`content__headline-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
  });
  const subtitle = cn(styles.content__subtitle, {
    [styles[`content__subtitle-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
  });

  const fadeProps = {
    from: { y: -50, opacity: 0 },
    to: { y: 0, opacity: 1 }
  };

  const aniSmall = useSpring({ ...fadeProps });
  const aniHeadline = useSpring({ ...fadeProps });
  const aniSubtitle = useSpring({ ...fadeProps });
  const aniButton = useSpring({
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1 }
  })

  return {
    classNames: {
      container,
      small,
      headline,
      subtitle,
    },
    animations: {
      aniHeadline,
      aniSmall,
      aniSubtitle,
      aniButton,
    },
  }
}

export default useAnimationsAndClasses;