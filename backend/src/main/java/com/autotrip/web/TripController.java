package com.autotrip.web;

import com.autotrip.dto.TripPlanRequest;
import com.autotrip.dto.TripPlanResponse;
import com.autotrip.service.TripPlanService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/trip")
public class TripController {

  private final TripPlanService tripPlanService;

  public TripController(TripPlanService tripPlanService) {
    this.tripPlanService = tripPlanService;
  }

  @PostMapping("/plan")
  public TripPlanResponse plan(@Valid @RequestBody TripPlanRequest request) {
    return tripPlanService.buildPlan(request);
  }
}
