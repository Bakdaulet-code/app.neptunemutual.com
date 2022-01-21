import FacebookIcon from "@/icons/facebook";
import LinkedinIcon from "@/icons/linkedin";
import TwitterIcon from "@/icons/twitter";

const IconLink = ({ href, iconText, icon }) => {
  return (
    <a
      href={href}
      className="inline-block mr-4 hover:text-4e7dd9"
      target="_blank"
      rel="noreferrer"
    >
      <span className="sr-only">{iconText}</span>
      {icon}
    </a>
  );
};

export const SocialIconLinks = ({ links }) => {
  const { facebook, linkedin, twitter } = links;

  return (
    <div className="mt-5">
      {facebook && (
        <IconLink
          href={facebook}
          iconText="Facebook"
          icon={<FacebookIcon width={24} />}
        />
      )}

      {linkedin && (
        <IconLink
          href={linkedin}
          iconText="LinkedIn"
          icon={<LinkedinIcon width={24} />}
        />
      )}

      {twitter && (
        <IconLink
          href={twitter}
          iconText="Twitter"
          icon={<TwitterIcon width={24} />}
        />
      )}
    </div>
  );
};