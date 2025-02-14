import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

export const ThemableLink = (props) => <Link as={NextLink} {...props} />;
