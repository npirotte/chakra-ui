import { getColor, mode, part } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

const baseStyle = {
  [part("Input", "field").selector]: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transition: "all 0.2s",
  },
}

const sizes = {
  lg: {
    fontSize: "lg",
    px: 4,
    h: 12,
    borderRadius: "md",
  },

  md: {
    fontSize: "md",
    px: 4,
    h: 10,
    borderRadius: "md",
  },

  sm: {
    fontSize: "sm",
    px: 3,
    h: 8,
    borderRadius: "sm",
  },

  xs: {
    fontSize: "xs",
    px: 2,
    h: 6,
    borderRadius: "sm",
  },
}

const size = {
  lg: {
    [[
      part("Input", "addon").selector,
      part("Input", "field").selector,
      part("Input", "element").selector,
    ].join(", ")]: sizes.lg,
  },
  md: {
    [[
      part("Input", "addon").selector,
      part("Input", "field").selector,
      part("Input", "element").selector,
    ].join(", ")]: sizes.md,
  },
  sm: {
    [[
      part("Input", "addon").selector,
      part("Input", "field").selector,
      part("Input", "element").selector,
    ].join(", ")]: sizes.sm,
  },
  xs: {
    [[
      part("Input", "addon").selector,
      part("Input", "field").selector,
      part("Input", "element").selector,
    ].join(", ")]: sizes.xs,
  },
}

function getDefaults(props: ThemeComponentProps) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props),
  }
}

function variantOutline(props: ThemeComponentProps) {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    [part("Input", "field").selector]: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.400")(props),
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
      },
      _focus: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: `0 0 0 1px ${getColor(theme, fc)}`,
      },
    },
    [part("Input", "addon").selector]: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props),
    },
  }
}

function variantFilled(props: ThemeComponentProps) {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    [part("Input", "field").selector]: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
      _hover: {
        bg: mode("gray.200", "whiteAlpha.100")(props),
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
      },
      _focus: {
        bg: "transparent",
        borderColor: getColor(theme, fc),
      },
    },
    [part("Input", "addon").selector]: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
    },
  }
}

function variantFlushed(props: ThemeComponentProps) {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    [part("Input", "field").selector]: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: 0,
      px: 0,
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0px 1px 0px 0px ${getColor(theme, ec)}`,
      },
      _focus: {
        borderColor: getColor(theme, fc),
        boxShadow: `0px 1px 0px 0px ${getColor(theme, fc)}`,
      },
    },
    [part("Input", "addon").selector]: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: 0,
      px: 0,
      bg: "transparent",
    },
  }
}

const variantUnstyled = {
  [part("Input", "field").selector]: {
    bg: "transparent",
    px: 0,
    height: "auto",
  },
  [part("Input", "addon").selector]: {
    bg: "transparent",
    px: 0,
    height: "auto",
  },
}

const variant = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled,
}

const defaultVariants = {
  size: "md",
  variant: "outline",
}

export default {
  ...baseStyle,
  variants: { variant, size },
  defaultVariants,
}
