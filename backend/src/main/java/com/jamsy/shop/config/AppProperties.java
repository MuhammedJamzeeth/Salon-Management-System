package com.jamsy.shop.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "application")
public class AppProperties {

    private String name;
    private String version;
    private Security security = new Security();

    @Data
    public static class Security {
        private Jwt jwt = new Jwt();

        @Data
        public static class Jwt {
            private String secretKey;
            private long expiration;
            private RefreshToken refreshToken = new RefreshToken();

            @Data
            public static class RefreshToken {
                private long expiration;
            }
        }
    }
}