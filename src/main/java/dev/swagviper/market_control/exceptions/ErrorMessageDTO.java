package dev.swagviper.market_control.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ErrorMessageDTO {

    private String message;
    private LocalDateTime timestamp;
    private int status;
}
