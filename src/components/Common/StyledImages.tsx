import { shouldForwardProp, styled } from "@mui/system";

// const StyledImage = styled("img")(unstable_styleFunctionSx);
const StyledImage = styled('img', {
    shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'sx',
})({});
export default StyledImage;
