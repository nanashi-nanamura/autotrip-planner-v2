package com.autotrip.service;

import com.autotrip.dto.TripPlanRequest;
import com.autotrip.dto.TripPlanResponse;
import com.autotrip.dto.TripPlanResponse.HotelSection;
import com.autotrip.dto.TripPlanResponse.ItineraryDay;
import com.autotrip.dto.TripPlanResponse.TravelSection;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class TripPlanService {

  private static final String EM_DASH = "\u2014";

  public TripPlanResponse buildPlan(TripPlanRequest req) {
    String origin = req.origin().trim();
    String destination = req.destination().trim();
    String budget = normalizeBudget(req.budget());
    Profile profile = profileFor(budget);

    String route = origin + " \u2192 " + destination;
    String window =
        hasText(req.startDate()) && hasText(req.endDate())
            ? req.startDate() + " \u2014 " + req.endDate()
            : "Flexible dates (we optimized around your window)";

    String carrierHint =
        "extravagant".equals(budget)
            ? "Flagship airline alliance"
            : "Top-rated carriers on this corridor";

    TravelSection travel = new TravelSection(route, window, profile.transportMode, carrierHint);
    HotelSection hotel = new HotelSection(profile.hotelName, profile.badge, profile.hotelBlurb);

    String day2Extra =
        switch (budget) {
          case "low" -> "Street food crawl & free walking tour.";
          case "extravagant" -> "Private guide + chef's table reservation.";
          default -> "Museum pass + chef-led market tasting.";
        };

    String transportPrefix = profile.transportMode.split(EM_DASH)[0].trim();

    List<ItineraryDay> itinerary =
        List.of(
            new ItineraryDay(
                1,
                "Arrival & first impressions",
                List.of(
                    "Land in " + destination + ", transfer to " + profile.hotelName + ".",
                    "Neighborhood stroll, local caf\u00e9, and sunset viewpoint.")),
            new ItineraryDay(
                2,
                "Signature experiences",
                List.of(
                    "Curated half-day highlights tour (culture + hidden gems).",
                    day2Extra)),
            new ItineraryDay(
                3,
                "Slow morning & departure",
                List.of(
                    "Brunch, last-minute souvenirs, checkout.",
                    "Return to "
                        + origin
                        + " via your selected "
                        + transportPrefix
                        + " option.")));

    return new TripPlanResponse(travel, hotel, itinerary);
  }

  private static String normalizeBudget(String raw) {
    if (raw == null || raw.isBlank()) {
      return "medium";
    }
    return switch (raw.trim().toLowerCase()) {
      case "low", "medium", "extravagant" -> raw.trim().toLowerCase();
      default -> "medium";
    };
  }

  private static boolean hasText(String s) {
    return s != null && !s.isBlank();
  }

  private static Profile profileFor(String budget) {
    return switch (budget) {
      case "low" ->
          new Profile(
              "Budget",
              "Economy "
                  + EM_DASH
                  + " smart connections & regional rail",
              "Urban Nest Hotel",
              "Clean, central, great reviews \u2014 maximum value for explorers.");
      case "extravagant" ->
          new Profile(
              "Luxury",
              "Business class + private chauffeur door-to-door",
              "The Aurelia Grand",
              "Iconic 5\u2605 landmark \u2014 spa, concierge, and skyline views.");
      default ->
          new Profile(
              "Balanced",
              "Premium economy flight + seamless airport transfer",
              "Harborline Boutique",
              "Stylish 4\u2605 stay with rooftop lounge and walkable dining.");
    };
  }

  private record Profile(
      String badge,
      String transportMode,
      String hotelName,
      String hotelBlurb
  ) {}
}
