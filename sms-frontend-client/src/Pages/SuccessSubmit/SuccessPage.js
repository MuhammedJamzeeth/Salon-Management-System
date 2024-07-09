import React, { useEffect } from "react";
import {
    Body,
    Container,
    Content,
    Window,
    Dots,
    Dot,
    Notch,
    HomeButton,
    Subtitle,
    Description,
    Title,
} from "./not_found.style";

const SuccessPage = () => {
    useEffect(() => {
        document.title = "404 - Page not found";
        return () => {
            document.title = "Lead Magnet";
        };
    }, []);
    return (
        <Body>
            <Container>
                <Content>
                    <Window data-tilt>
                        <Dots>
                            <Dot className="red" />
                            <Dot className="yellow" />
                            <Dot className="green" />
                        </Dots>
                        <Notch />
                        <Title>Thank You</Title>
                        <HomeButton />
                    </Window>
                    <Subtitle>
                        <span data-lang="en">Successfully Booked</span>
                        {/* <span data-lang="de">Hoppla! Seite nicht gefunden</span> */}
                    </Subtitle>
                    <Description>
            <span data-lang="en">
                Your booking has been successful.
              <br />
                We will send you a message with the details of your booking.
            </span>
                        {/* <span data-lang="de">
              Anscheinend existiert diese Seite nicht.
              <br />
              Überprüfe deine Netzwerkverbindung und versuche es später erneut.
            </span> */}
                    </Description>
                </Content>
            </Container>
        </Body>
    );
};

export default SuccessPage;
