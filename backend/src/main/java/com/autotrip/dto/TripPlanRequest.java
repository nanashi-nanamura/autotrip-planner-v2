package com.autotrip.dto;

import jakarta.validation.constraints.NotBlank;

public record TripPlanRequest(
    @NotBlank String origin,
    @NotBlank String destination,
    @NotBlank String budget,
    String startDate,
    String endDate
) {}
