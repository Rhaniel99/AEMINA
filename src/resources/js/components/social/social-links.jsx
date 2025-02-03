import React from "react";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export default function SocialLinks() {
  const social_links = [
    {
      name: "google",
      // Para o Google, você pode definir uma ação ou login handler
      url: route("auth.google"),
      icon: <FaGoogle size={18} />,
    },
    {
      name: "facebook",
      url: "https://facebook.com/seu-link-especifico",
      icon: <FaFacebook size={18} />,
    },
    {
      name: "github",
      url: "https://github.com/seu-link-especifico",
      icon: <FaGithub size={18} />,
    },
    {
      name: "linkedin",
      url: "https://linkedin.com/in/seu-link-especifico",
      icon: <FaLinkedin size={18} />,
    },
  ];

  return (
    <div className="my-5 flex space-x-2 mb-4">
      {social_links.map((social) =>
          <a
          key={social.name}
          href={social.url}
        //   target="_blank"
          rel="noopener noreferrer"
          className="border border-[#ccc] rounded-[20%] inline-flex justify-center items-center mx-0.5 w-10 h-10 text-sm text-gray-700 mt-3.75 mb-2.5 underline-none"
        >
          {social.icon}
        </a>
      )}
    </div>
  );
}
