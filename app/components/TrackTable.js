import { convertMillisecondsToText, formatPrice, truncateString } from "@/utils/Helper";
import InvisibleButton from "./InvisibleButton";
import NavLink from "./NavLink";
import Constants from "@/utils/Constants";
import Image from "next/image";
import StartSvg from "../../public/assets/svg/icons/start.svg";
import PauseSvg from "../../public/assets/svg/icons/pause.svg";
import EditSvg from "../../public/assets/svg/icons/edit.svg";
import DeleteSvg from "../../public/assets/svg/icons/delete.svg";
import { Lexend, Montserrat } from "next/font/google";

const lexend = Lexend({ weight: "700", subsets: ["latin"] });
const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const { TRACK_STATUS_ENABLED } = Constants;

const TrackTable = ({ className = "", tracks }) => {
  const formatFullPrice = (track) => {
    const price = getLowestPrice(track);

    if (price < track.initial_price) {
      return (
        <>
          {formatPrice(price)}
          <span className="text-xs">{track.currency}</span>{" "}
          <span className="text-xs line-through">
            {formatPrice(track.initial_price) + track.currency}
          </span>
        </>
      );
    } else {
      return (
        <>
          {formatPrice(price)}
          <span className="text-xs">{track.currency}</span>
        </>
      );
    }
  };

  const getLastCheckTimeTitle = (track) => {
    return new Date(track.updated_at).toLocaleString();
  };

  const getPriceStatusSvgName = (track) => {
    switch (track.price_status) {
      case 1:
        return "price-decreased";

      case 2:
        return "price-increased";

      case 3:
      default:
        return "price-stable";
    }
  };

  const getPriceStatusSvgTitle = (track) => {
    switch (track.price_status) {
      case 1:
        return "Price dropped";

      case 2:
        return "Price increased";

      case 3:
      default:
        return "Price stable";
    }
  };

  const getAvailabilitySvgName = (track) => {
    switch (track.availability) {
      case true:
        return "circle-check-success";

      case false:
      default:
        return "circle-cross-error";
    }
  };

  const getAvailabilitySvgTitle = (track) => {
    switch (track.availability) {
      case true:
        return "Product in stock";

      case false:
      default:
        return "Product out of stock";
    }
  };

  const getAvailabilityText = (track) => {
    switch (track.availability) {
      case true:
        return "In stock";

      case false:
      default:
        return "Out of stock";
    }
  };

  const getLowestPrice = (track) => {
    return track.discounted_price < track.normal_price
      ? track.discounted_price
      : track.normal_price;
  };

  const getSiteDomain = (track) => {
    try {
      const cleanedUrl = track.url.replace(/^[a-zA-Z]+:\/\//, "");
      const domain = cleanedUrl.split("/")[0];
      const parts = domain.split(".");

      return parts.length > 2 ? parts.slice(-2).join(".") : domain;
    } catch (e) {
      return "Unknown website";
    }
  };

  return (
    <table className={`${className} w-full`}>
      <thead className="text-nowrap rounded-full border-b">
        <tr className={`${lexend.className} text-xl uppercase`}>
          <th className="py-2">Product</th>
          <th className="py-2">Price</th>
          <th className="py-2">Availability</th>
          <th className="py-2">Check</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track) => {
          return (
            <tr
              className={`${montserrat.className} text-md rounded-full border-b uppercase`}
              key={`track-${track.id}`}
            >
              <td className="py-4 text-center">
                <NavLink
                  target="_blank"
                  type="contrast"
                  href={track.url}
                  className="text-nowrap text-center text-sm text-primary"
                >
                  <p title={getSiteDomain(track)}>{truncateString(track.name, 50)} 🔗</p>
                </NavLink>
              </td>
              <td className="py-4">
                <div className="flex items-center justify-center space-x-2 text-nowrap text-center text-2xl">
                  <div className="flex flex-shrink-0 items-center justify-center">
                    <Image
                      width={40}
                      height={40}
                      src={`assets/svg/icons/${getPriceStatusSvgName(track)}.svg`}
                      alt="price status"
                      title={getPriceStatusSvgTitle(track)}
                    />
                  </div>
                  <p>{formatFullPrice(track)}</p>
                </div>
              </td>
              <td className="py-4">
                <div className="flex items-center justify-center space-x-2 text-nowrap text-center">
                  <div className="flex flex-shrink-0 items-center justify-center">
                    <Image
                      width={26}
                      height={26}
                      src={`assets/svg/icons/${getAvailabilitySvgName(track)}.svg`}
                      alt="availability status"
                      title={getAvailabilitySvgTitle(track)}
                    />
                  </div>
                  <p>{getAvailabilityText(track)}</p>
                </div>
              </td>
              <td
                className="py-4 text-center"
                title={`Last check: ${getLastCheckTimeTitle(track)}`}
              >
                {track.status === TRACK_STATUS_ENABLED
                  ? convertMillisecondsToText(track.created_at - Date.now() + track.check_interval)
                  : getLastCheckTimeTitle(track)}
              </td>
              <td className="py-4">
                <div className="flex items-center justify-center space-x-3">
                  <InvisibleButton className="flex w-fit items-center justify-center">
                    <Image className="w-7" src={DeleteSvg} alt="delete" title="Delete the track" />
                  </InvisibleButton>
                  <InvisibleButton className="flex w-fit items-center justify-center">
                    <Image className="w-7" src={EditSvg} alt="edit" title="Edit the track" />
                  </InvisibleButton>
                  <InvisibleButton className="flex w-fit items-center justify-center">
                    <Image
                      className="w-7"
                      src={track.status !== TRACK_STATUS_ENABLED ? StartSvg : PauseSvg}
                      alt="start pause"
                      title={`${track.status !== TRACK_STATUS_ENABLED ? "Start" : "Stop"} the track`}
                    />
                  </InvisibleButton>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TrackTable;
