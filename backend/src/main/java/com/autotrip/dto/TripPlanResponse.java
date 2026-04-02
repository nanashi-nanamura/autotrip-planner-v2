package com.autotrip.dto;

import java.util.List;

public record TripPlanResponse(
    TravelSection travel,
    HotelSection hotel,
    List<ItineraryDay> itinerary
) {

  public record TravelSection(
      String route,
      String window,
      String mode,
      String carrierHint
  ) {}

  public record HotelSection(
      String name,
      String badge,
      String blurb
  ) {}

  public record ItineraryDay(
      int day,
      String title,
      List<String> items
  ) {}
}
