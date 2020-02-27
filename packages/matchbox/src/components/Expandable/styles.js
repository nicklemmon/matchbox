import { tokens } from '@sparkpost/design-tokens';
import { StyledHeader } from './Expandable';

export const expandable = props => {
  let borderRadius = tokens.borderRadius_100;

  if (props.accent) {
    borderRadius = `0 0 ${tokens.borderRadius_100} ${tokens.borderRadius_100}`;
  }

  return `
    border: ${tokens.borderWidth_100} solid ${tokens.color_gray_400};
    border-radius: ${borderRadius};
    border-top-width: ${props.accent ? tokens.borderWidth_0 : tokens.borderWidth_100}
  `;
};

export const header = () => `
  padding: 12px;

  user-select: none;
  outline: none;

  transition: background ${tokens.motionDuration_fast};

  &:hover {
    cursor: pointer;
  }

  &:focus:not(:hover) {
    background: ${tokens.color_gray_200};
  }
`;

export const arrow = props => {
  let rotate = 'rotate(0deg)';

  if (props.isOpen) {
    rotate = 'rotate(90deg)';
  }

  return `
    border-radius: ${tokens.borderRadius_circle};
    padding: ${tokens.spacing_100};
    transition: ${tokens.motionDuration_fast} ${tokens.motionEase_in_out};
    transform-origin: center;

    transform: ${rotate};

    ${StyledHeader}:hover & {
      background: ${tokens.color_gray_200};
    }
  `;
};

export const contentWrapper = props => {
  let visibility = 'hidden';
  let display = 'none';

  if (props.isOpen) {
    visibility = 'visible';
    display = 'flex';
  }

  return `
    padding: ${tokens.spacing_300};
    visibility: ${visibility};
    display: ${display};
  `;
};

export const title = () => `
  margin-bottom: 0;
  font-size: ${tokens.fontSize_400};
  font-weight: ${tokens.fontWeight_semibold};
`;

export const subtitle = () => `
  margin-bottom: 0;
  font-weight: ${tokens.fontWeight_normal};
`;

export const accent = props => {
  let color;

  switch (props.accentColor) {
    case 'orange':
      color = tokens.color_brand_orange;
      break;
    case 'green':
      color = tokens.color_green_700;
      break;
    case 'yellow':
      color = tokens.color_yellow_400;
      break;
    case 'red':
      color = tokens.color_red_700;
      break;
    case 'gray':
      color = tokens.color_gray_600;
      break;
    case 'blue':
    case 'navy':
    case 'purple':
    default:
      color = tokens.color_blue_700;
  }

  return `
    height: ${tokens.spacing_100};
    border-radius: ${tokens.borderRadius_100} ${tokens.borderRadius_100} 0 0;
    background-color: ${color};
  `;
};
