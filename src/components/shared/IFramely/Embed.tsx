import { Card } from "../../utils/Card.tsx";
import trackEvent from "../../utils/trackEvent.ts";
import { Box, Image } from "@chakra-ui/react";
import React, { FC } from "react";

interface Props {
  og: any;
}

const Embed: FC<Props> = ({ og }) => {
  return (
    <Box marginTop="1rem" fontSize="0.875rem" lineHeight="1.25rem">
      <a
        href={og.url}
        target="_blank"
        rel="noreferrer noopener"
        onClick={() => trackEvent("oembed")}
      >
        <Card>
          {!og.isSquare && og.thumbnail && (
            <Image
              w="full"
              borderTopRadius="0.75rem"
              className="w-full rounded-t-xl"
              src={og.thumbnail}
              alt="Thumbnail"
            />
          )}
          <Box display="flex" alignItems="center">
            {og.isSquare && og.thumbnail && (
              <Image
                width="9rem"
                height="9rem"
                borderLeftRadius="0.75rem"
                src={og.thumbnail}
                alt="Thumbnail"
              />
            )}
            <Box
              padding="1.25rem"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              <Box className="space-y-1.5">
                {og.title && <Box fontWeight="700">{og.title}</Box>}
                {og.description && (
                  <Box color="gray.500" overflow="hidden">
                    {og.description}
                  </Box>
                )}
                {og.site && (
                  <Box display="flex" alignItems="center">
                    {og.favicon && (
                      <Image
                        width="1rem"
                        height="1rem"
                        borderRadius="9999px"
                        src={og.favicon}
                        alt="Favicon"
                      />
                    )}
                    <Box fontSize="0.75rem" color="gray.500">
                      {og.site}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Card>
      </a>
    </Box>
  );
};

export default Embed;
